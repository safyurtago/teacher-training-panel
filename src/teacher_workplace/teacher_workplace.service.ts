import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherWorkplaceDto } from './dto/create-teacher_workplace.dto';
import { UpdateTeacherWorkplaceDto } from './dto/update-teacher_workplace.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

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
  findAll() {
    return `This action returns all teacherWorkplace`;
  }

  // FIND ONE WORKPLACE BY ID
  findOne(id: number) {
    return `This action returns a #${id} teacherWorkplace`;
  }

  // UPDATE ONE WORKPLACE BY ID
  update(id: number, updateTeacherWorkplaceDto: UpdateTeacherWorkplaceDto) {
    return `This action updates a #${id} teacherWorkplace`;
  }

  // DELETE ONE WORKPLACE BY ID
  remove(id: number) {
    return `This action removes a #${id} teacherWorkplace`;
  }
}
