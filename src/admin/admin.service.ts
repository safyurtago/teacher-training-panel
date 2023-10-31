import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FindFilteredAdminsDto } from './dto/find-filter-admins.dto';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto, LoginAdminDto } from './dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AdminService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  // SIGN UP ADMIN
  async signUp (
    createAdminDto: CreateAdminDto, res: Response,
  ) {
    const {
      first_name, last_name, email, password, confirm_password, username,
    } = createAdminDto;
    
    const findAdmin = await this.prismaService.admin.findUnique({where: {email}})
    if (findAdmin) { throw new BadRequestException('This email is already in use! Please try again') }
    const findAdmin1 = await this.prismaService.admin.findUnique({where: {username}})
    if (findAdmin1) { throw new BadRequestException('This Username is already in use! Please try again') }
    if (password !== confirm_password) { throw new BadRequestException('Passwords do not match!'); }

    const hashed_password: string = await bcrypt.hash(password, 12);
    
    const newAdmin = await this.prismaService.admin.create({
      data: {first_name, last_name, email, hashed_password, username}
    })

    const tokens = await this.getAdminTokens(newAdmin.id, newAdmin.email);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const activation_link = v4();
    
    const updatedAdmin = await this.prismaService.admin.update({
      data: {
        hashed_refresh_token,
        activation_link,
      },
      where: {
        id: newAdmin.id
      }
    })

    await this.mailService.sendAdminConfirmation(updatedAdmin);
    
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
    const findAdmin = await this.prismaService.admin.findFirst({where: {activation_link: link, is_active: false}})
    if (!findAdmin) {
      throw new BadRequestException('Admin already activated')
    }

    await this.prismaService.admin.update({
      data: {is_active: true},
      where: {activation_link: link, is_active: false},
    })

      
    const response = {
      message: 'Admin activated Successfully',
    }
    return response;
  }

  // SIGNIN ADMIN
  async signIn (loginAdminDto: LoginAdminDto, res: Response) {
    const {email, password} = loginAdminDto
    const admin = await this.prismaService.admin.findUnique({where: {email}})
    if (!admin) throw new UnauthorizedException('Admin not found')
    if (!admin.is_active) throw new BadRequestException('Admin not active')

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password)
    if (!isMatchPass) throw new UnauthorizedException('Admin not found')

    const tokens = await this.getAdminTokens(admin.id, admin.email)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12)

    const updatedAdmin = await this.prismaService.admin.update({
      data: {hashed_refresh_token},
      where: {id: admin.id}
    })
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7*24*60*60*1000,
      httpOnly: true
    })
    return tokens;
  }

  // SIGN OUT ADMIN
  async signOut (refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken,
      {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
      });
      
    if (!adminData) throw new ForbiddenException('Admin not found')
    
      await this.prismaService.admin.update({
      data: {hashed_refresh_token: null},
      where: {id: adminData.sub}
    })

    res.clearCookie('refresh_token')
    const response = {
      message: 'Admin logged put successfully',
    }
    return response;
  }

  // REFRESH TOKEN ADMIN
  async refreshToken (adminId: string, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    
    if (adminId != decodedToken['sub']) throw new BadRequestException('Admin not found')

    const admin = await this.prismaService.admin.findFirst({
      where: {id: adminId},
    });
    if (!admin || !admin.hashed_refresh_token) throw new BadRequestException('Admin not found')

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token
    )
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const tokens = await this.getAdminTokens(admin.id, admin.email);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const updateAdmin = await this.prismaService.admin.update({
      data: {hashed_refresh_token},
      where: {id: adminId},
    })

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })
    return tokens;
  }

  // FIN FILTERED ADMIN 
  async findFilteredAdmins (
    findFilteredAdminsDto: FindFilteredAdminsDto,
  ) {
    let where = {};
    if (findFilteredAdminsDto.email) {
      where['email'] = {
          contains: findFilteredAdminsDto.email
      }
    }
    if (findFilteredAdminsDto.last_name) {
      where['last_name'] = {
          contains: findFilteredAdminsDto.last_name
      }
    }
    if (findFilteredAdminsDto.first_name) {
      where['first_name'] = {
          contains: findFilteredAdminsDto.first_name
      }
    }
    if (findFilteredAdminsDto.username) {
      where['username'] = {
          contains: findFilteredAdminsDto.username
      }
    }
    return this.prismaService.admin.findMany({where})
  }

  // FIND ONE ADMIN BY ID
  async findOneAdmin (id: string, req: Request) {
    const adminId = req['admin'].id;
    const findAdmin = await this.prismaService.admin.findFirst({where: {id}})
    if (!findAdmin) throw new BadRequestException('Admin not found');
    if (findAdmin.id !== adminId) throw new BadRequestException('You dont have permission')
    return findAdmin;
  }

  // GET TOKENS METHOD 
  async getAdminTokens(sub: string, email: string) {
    const jwtPayload: {sub: string, email: string} = {
      sub,
      email
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      })
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  // UPDATE ADMIN BY ID
  async updateAdmin (
    id: string, updateAdminDto: UpdateAdminDto, req: Request,
  ) {
    const adminId = req['admin'].id;
    const findAdmin = await this.prismaService.admin.findFirst({where:{id}});
    if (!findAdmin) throw new BadRequestException("Admin not found");
    if (findAdmin.id !== adminId) throw new BadRequestException("You dont have permission");
    return this.prismaService.admin.update({
      data: {...updateAdminDto},
      where: {id},
    })
  }

  // DELETE ADMIN BY ID 
  async deleteAdmin (
    id: string, req: Request,
  ) {
    const adminId = req['admin'].id;
    const findAdmin = await this.prismaService.admin.findFirst({where:{id}});
    if (!findAdmin) throw new BadRequestException("Admin not found");
    if (findAdmin.id !== adminId) throw new BadRequestException("You dont have permission");
    return this.prismaService.admin.delete({where: {id}})
  }


  // CHANGE PASSWORD ADMIN
  async changePassword (
    changePasswordDto: ChangePasswordDto,
    req: Request,
    ) {
      try {
        const adminId = req['admin'].id;
        const findAdmin = await this.prismaService.admin.findFirst({where:{id: adminId}});
        const isMatchPass = await bcrypt.compare(changePasswordDto.old_password, findAdmin.hashed_password)
        if (!isMatchPass) throw new UnauthorizedException('Old password not match');
        if (changePasswordDto.new_password !== changePasswordDto.confirm_new_password) {
          throw new BadRequestException("New passwords do not match");
        }
        const new_hashed_password = await bcrypt.hash(changePasswordDto.new_password, 12);
        await this.prismaService.admin.update({
          data: {hashed_password: new_hashed_password},
          where: {id: adminId}
        })
        return true;
      } catch (error) {
        return false;
      }
  }
}
