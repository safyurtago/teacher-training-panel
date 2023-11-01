import { ChangePasswordDto } from './dto/change-password.dto';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid';
import { MailService } from '../mail/mail.service';
import { CreateTeacherDto, LoginTeacherDto, UpdateTeacherDto } from './dto';
import { FindFilteredTeachersDto } from './dto/find-filter-teachers.dto';

@Injectable()
export class TeacherService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

   // SIGN UP Teacher
   async signUp (
    createTeacherDto: CreateTeacherDto, res: Response,
  ) {
    const {
      first_name, last_name, email, password, confirm_password, username,
    } = createTeacherDto;
    
    const findTeacher = await this.prismaService.teacher.findUnique({where: {email}})
    if (findTeacher) { throw new BadRequestException('This email is already in use! Please try again') }
    const findTeacher1 = await this.prismaService.teacher.findUnique({where: {username}})
    if (findTeacher1) { throw new BadRequestException('This Username is already in use! Please try again') }
    if (password !== confirm_password) { throw new BadRequestException('Passwords do not match!'); }

    const hashed_password: string = await bcrypt.hash(password, 12);
    
    const newTeacher = await this.prismaService.teacher.create({
      data: {first_name, last_name, email, hashed_password, username}
    })

    const tokens = await this.getTeacherTokens(newTeacher.id, newTeacher.email);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const activation_link = v4();
    
    const updatedTeacher = await this.prismaService.teacher.update({
      data: {
        hashed_refresh_token,
        activation_link,
      },
      where: {
        id: newTeacher.id
      }
    })

    await this.mailService.sendTeacherConfirmation(updatedTeacher);
    
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;

  }

  // ACTIVATE REGISTRATION
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found')
    }

    const findTeacher = await this.prismaService.teacher.findFirst({where: {activation_link: link, is_active: false}})

    if (!findTeacher) {
      throw new BadRequestException('Teacher already activated')
    }

    await this.prismaService.teacher.update({
      data: {is_active: true},
      where: {activation_link: link},
    })
    
      
    const response = {
      message: 'Teacher activated Successfully',
    }
    return response
  }

  // SIGNIN Teacher
  async signIn (loginTeacherDto: LoginTeacherDto, res: Response) {
    const {email, password} = loginTeacherDto
    const Teacher = await this.prismaService.teacher.findUnique({where: {email}})
    if (!Teacher) throw new UnauthorizedException('Teacher not found')
    if (!Teacher.is_active) throw new BadRequestException('Teacher not active')

    const isMatchPass = await bcrypt.compare(password, Teacher.hashed_password)
    if (!isMatchPass) throw new UnauthorizedException('Teacher not found')

    const tokens = await this.getTeacherTokens(Teacher.id, Teacher.email)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12)

    const updatedTeacher = await this.prismaService.teacher.update({
      data: {hashed_refresh_token},
      where: {id: Teacher.id}
    })
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7*24*60*60*1000,
      httpOnly: true
    })
    return tokens;
  }

  // SIGN OUT Teacher
  async signOut (refreshToken: string, res: Response) {
    const TeacherData = await this.jwtService.verify(refreshToken,
      {
        secret: process.env.TEACHER_REFRESH_TOKEN_KEY,
      });
    if (!TeacherData) throw new ForbiddenException('Teacher not found')
    
      await this.prismaService.teacher.update({
      data: {hashed_refresh_token: null},
      where: {id: TeacherData.sub}
    })

    res.clearCookie('refresh_token')
    const response = {
      message: 'Teacher logged put successfully',
    }
    return response;
  }

  // REFRESH TOKEN Teacher
  async refreshToken (TeacherId: string, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    
    if (TeacherId != decodedToken['sub']) throw new BadRequestException('Teacher not found')

    const Teacher = await this.prismaService.teacher.findFirst({
      where: {id: TeacherId},
    });
    if (!Teacher || !Teacher.hashed_refresh_token) throw new BadRequestException('Teacher not found')

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      Teacher.hashed_refresh_token
    )
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const tokens = await this.getTeacherTokens(Teacher.id, Teacher.email);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const updateTeacher = await this.prismaService.teacher.update({
      data: {hashed_refresh_token},
      where: {id: TeacherId},
    })

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })
    return tokens;
  }

  // FIN FILTERED Teacher 
  async findFilteredTeachers (
    findFilteredTeachersDto: FindFilteredTeachersDto,
  ) {
    let where = {};
    if (findFilteredTeachersDto.email) {
      where['email'] = {
          contains: findFilteredTeachersDto.email
      }
    }
    if (findFilteredTeachersDto.last_name) {
      where['last_name'] = {
          contains: findFilteredTeachersDto.last_name
      }
    }
    if (findFilteredTeachersDto.first_name) {
      where['first_name'] = {
          contains: findFilteredTeachersDto.first_name
      }
    }
    if (findFilteredTeachersDto.username) {
      where['username'] = {
          contains: findFilteredTeachersDto.username
      }
    }
    return this.prismaService.teacher.findMany({where, include: {teacher_workplace: true, teacher_personal_info: true}})
  }

  // FIND ONE Teacher BY ID
  async findOneTeacher (id: string, req: Request) {
    const teacherId = req['teacher'].id;
    const findTeacher = await this.prismaService.teacher.findFirst({where: {id}, include: {teacher_workplace: true, teacher_personal_info: true}})
    if (!findTeacher) throw new BadRequestException('Teacher not found');
    if (findTeacher.id !== teacherId) throw new BadRequestException('You dont have permission')
    return findTeacher;
  }

    /** FIND ONE Teacher BY ID */
    async findOneTeacherByAdmin (id: string) {
      const findTeacher = await this.prismaService.teacher.findFirst({where: {id}, include: {teacher_workplace: true, teacher_personal_info: true}})
      if (!findTeacher) throw new BadRequestException('Teacher not found');
      return findTeacher;
    }


  /** GET TOKENS METHOD */ 
  async getTeacherTokens(sub: string, email: string) {
    const jwtPayload: {sub: string, email: string} = {
      sub,
      email
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.TEACHER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.TEACHER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.TEACHER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.TEACHER_REFRESH_TOKEN_TIME,
      })
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  // UPDATE Teacher BY ID
  async updateTeacher (
    id: string, updateTeacherDto: UpdateTeacherDto, req: Request,
  ) {
    const teacherId = req['teacher'].id;
    const findTeacher = await this.prismaService.teacher.findFirst({where:{id}});
    if (!findTeacher) throw new BadRequestException("Teacher not found");
    if (findTeacher.id !== teacherId) throw new BadRequestException("You dont have permission");
    return this.prismaService.teacher.update({
      data: {...updateTeacherDto},
      where: {id},
    })
  }

  // DELETE Teacher BY ID 
  async deleteTeacher (
    id: string, req: Request,
  ) {
    const teacherId = req['teacher'].id;
    const findTeacher = await this.prismaService.teacher.findFirst({where:{id}});
    if (!findTeacher) throw new BadRequestException("Teacher not found");
    if (findTeacher.id !== teacherId) throw new BadRequestException("You dont have permission");
    return this.prismaService.teacher.delete({where: {id}})
  }


  // CHANGE PASSWORD Teacher
  async changePassword (
    changePasswordDto: ChangePasswordDto,
    req: Request,
    ) {
      try {
        const TeacherId = req['Teacher'].id;
        const findTeacher = await this.prismaService.teacher.findFirst({where:{id: TeacherId}});
        const isMatchPass = await bcrypt.compare(changePasswordDto.old_password, findTeacher.hashed_password)
        if (!isMatchPass) throw new UnauthorizedException('Old password not match');
        if (changePasswordDto.new_password !== changePasswordDto.confirm_new_password) {
          throw new BadRequestException("New passwords do not match");
        }
        const new_hashed_password = await bcrypt.hash(changePasswordDto.new_password, 12);
        await this.prismaService.teacher.update({
          data: {hashed_password: new_hashed_password},
          where: {id: TeacherId}
        })
        return true;
      } catch (error) {
        return false;
      }
  }
}
