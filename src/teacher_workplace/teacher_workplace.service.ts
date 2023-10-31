import { FindTeacherWorkplaceDto } from './dto/find-teacher_workplace.dto';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateTeacherWorkplaceDto, UpdateTeacherWorkplaceDto } from './dto';
import { Request } from 'express';

@Injectable()
export class TeacherWorkplaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**  CREATE WORKPLACE BY TEACHER */
  async createTeacherWorkplace (createTeacherWorkplaceDto: CreateTeacherWorkplaceDto) {

    const {position, teacherId, schoolId} = createTeacherWorkplaceDto;
    const teacher = await this.prismaService.teacher.findFirst({where: {id: teacherId}})
    if (!teacher) { throw new BadRequestException('Teacher not found'); }
    const school = await this.prismaService.school.findFirst({where: {id: schoolId}});
    if (!school) { throw new BadRequestException('School not found'); }
    const findTeacherWorkplace = await this.prismaService.teacherWorkplace.findFirst({where: {teacherId}});
    if (findTeacherWorkplace) throw new BadRequestException('Workplace Already Exists')

    return this.prismaService.teacherWorkplace.create({data: createTeacherWorkplaceDto});
  }

  /**  FIND ALL FILTERED WORKPLACES */
  async findAllWorkplaces(findTeacherWorkplaceDto: FindTeacherWorkplaceDto) {
    const {position, teacher_username, school_name} = findTeacherWorkplaceDto;
    let where1 = {};
    if (position) {
      where1 = {
        position: {
          contains: position
        }
      }
    }
    if (teacher_username) {
      const teacher = await this.prismaService.teacher.findFirst({where: {username: {contains: teacher_username}}});

      if (teacher) where1 = { ...where1, teacherId: teacher.id };
    }
    
    if (school_name) {
      const school = await this.prismaService.school.findFirst({where: {name: {contains: school_name}}});
      if (school) where1 = { ...where1, schoolId: school.id };
    }
    console.log(where1);
    return this.prismaService.teacherWorkplace.findMany({where: where1, include: {school: true, teacher: true}});
  }

  /** FIND ONE WORKPLACE BY ID BY TEACHER */
  async findOneByTeacher(id: string, req: Request) {
    const teacher = req['teacher']
    const workplace = await this.prismaService.teacherWorkplace.findFirst({where: {id}})
    if (!workplace) { throw new BadRequestException(`Teacher workplace not found`); }
    if (teacher.id !== workplace.teacherId) { throw new ForbiddenException('You do not have permission!'); };
    return workplace;
  }

  /** FIND ONE WORKPLACE BY ID BY ADMIN */
  async findOneByAdmin(id: string) {
    const workplace = await this.prismaService.teacherWorkplace.findFirst({where: {id}})
    if (!workplace) { throw new BadRequestException(`Teacher workplace not found`); }
    return workplace;
  }

  /** UPDATE ONE WORKPLACE BY ID */
  async update(id: string, updateTeacherWorkplaceDto: UpdateTeacherWorkplaceDto, req: Request) {
    const teacher = req['teacher']
    const school = await this.prismaService.school.findFirst({where: {id: updateTeacherWorkplaceDto.schoolId}});
    if (!school) throw new BadRequestException('School Not Found!')
    const workplace = await this.prismaService.teacherWorkplace.findFirst({where: {id}})
    if (!workplace) { throw new BadRequestException(`Teacher Workplace Not Found`); }
    if (teacher.id !== workplace.teacherId) { throw new ForbiddenException('You do not have permission!'); };
    return this.prismaService.teacherWorkplace.update({
      data: {...updateTeacherWorkplaceDto},
      where: {id}
    });
  }

  /** DELETE ONE WORKPLACE BY ID */
  async remove(id: string, req: Request) {
    const teacher = req['teacher']
    const workplace = await this.prismaService.teacherWorkplace.findFirst({where: {id}})
    if (!workplace) { throw new BadRequestException(`Teacher workplace not found`); }
    if (teacher.id !== workplace.teacherId) { throw new ForbiddenException('You do not have permission!'); };
    return this.prismaService.teacherWorkplace.delete({where: {id}});
  }
}
