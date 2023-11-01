import { FileService } from './../file/file.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { CreateTeacherPersonalInfoDto, FindTeacherPersonalInfoDto, UpdateTeacherPersonalInfoDto } from './dto';

@Injectable()
export class TeacherPersonalInfoService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  /** CREATE TeacherPersonalInfo BY TEACHER */
  async createTeacherPersonalInfo(
    createTeacherPersonalInfoDto: CreateTeacherPersonalInfoDto,
    req: Request,
    image: any,
    ) {
      let data: any = {...createTeacherPersonalInfoDto};
      const teacherId = req['teacher'].id;
      if (!teacherId) { throw new BadRequestException('Teacher ID Not Found!'); }
      const teacherPersonalInfo = await this.prismaService.teacherPersonalInfo.findFirst({where: {teacherId}})
      if (teacherPersonalInfo) { throw new BadRequestException('Teacher Personal Info Already Exists!'); }
      if (image) {
        const fileName = await this.fileService.createFile(image);
        data = {...data, photo: fileName};
      }
      data = {...data, teacherId};
      return this.prismaService.teacherPersonalInfo.create({data});
  }

  /** FIND ALL TeacherPersonalInfos BY ADMIN */
  async findAllTeacherPersonalInfos(findTeacherPersonalInfoDto: FindTeacherPersonalInfoDto) {
    let where1 = {};
    if (findTeacherPersonalInfoDto.nationality) { where1['nationality'] = { contains: findTeacherPersonalInfoDto.nationality } }
    if (findTeacherPersonalInfoDto.passport_serial) { where1['passport_serial'] = { contains: findTeacherPersonalInfoDto.passport_serial } }
    if (findTeacherPersonalInfoDto.gender) { where1['gender'] = { contains: findTeacherPersonalInfoDto.gender } }
    return this.prismaService.teacherPersonalInfo.findMany({where: where1, include: {teacher: true}})
  }

  /** FIND ONE TeacherPersonalInfos BY TEACHER */
  async findOne(id: string, req: Request) {
    const teacher = req['teacher'];
    const data = await this.prismaService.teacherPersonalInfo.findFirst({where: {id}, include: {teacher: true}});
    if (!data) throw new BadRequestException('TeacherPersonalInfos Not Found!');
    if (teacher.id !== data.teacherId) throw new BadRequestException('You do not have permission');
    return data;
  }

  /** FIND ONE TeacherPersonalInfos BY ADMIN */
  async findOneByAdmin(id: string) {
    const data = await this.prismaService.teacherPersonalInfo.findFirst({where: {id}, include: {teacher: true}});
    if (!data) throw new BadRequestException('TeacherPersonalInfos Not Found!');
    return data;
  }

  /** UPDATE ONE TeacherPersonalInfos BY TEACHER */
  async update(id: string, updateTeacherPersonalInfoDto: UpdateTeacherPersonalInfoDto, req: Request) {
    const teacher = req['teacher'];
    const data1 = await this.prismaService.teacherPersonalInfo.findFirst({where: {id}});
    if (!data1) throw new BadRequestException('TeacherPersonalInfos Not Found!');
    if (teacher.id !== data1.teacherId) throw new BadRequestException('You do not have permission');
    return this.prismaService.teacherPersonalInfo.update({
      data: updateTeacherPersonalInfoDto,
      where: {id},
    });
  }

  /** DELETE ONE TeacherPersonalInfos BY TEACHER */
  async remove(id: string, req: Request) {
    const teacher = req['teacher'];
    const data1 = await this.prismaService.teacherPersonalInfo.findFirst({where: {id}});
    if (!data1) throw new BadRequestException('TeacherPersonalInfos Not Found!');
    if (teacher.id !== data1.teacherId) throw new BadRequestException('You do not have permission');
    return `This action removes a #${id} teacherPersonalInfo`;
  }
}
