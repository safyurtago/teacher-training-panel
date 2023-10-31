import { FindSchoolDto } from './dto/find-school.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchoolDto, UpdateSchoolDto } from './dto';

@Injectable()
export class SchoolService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  /** CREATE SCHOOL */
  async createSchool(createSchoolDto: CreateSchoolDto) {
    const findSchool = await this.prismaService.school.findUnique({where: {name: createSchoolDto.name}})
    if (findSchool) { throw new BadRequestException('School has already existed!') }
    const findRegion = await this.prismaService.region.findUnique({where: {id: createSchoolDto.region_id}})
    if (!findRegion) { throw new BadRequestException('Region not found!') }
    return this.prismaService.school.create({data: createSchoolDto});
  }

  /** FIND ALL SCHOOLS */
  async findAllSchools(findSchoolDto: FindSchoolDto) {
    let where0 = {};
    if (findSchoolDto.name) {
      where0['name'] = {
        contains: findSchoolDto.name,
      }
    }
    if (findSchoolDto.region_name) {
      let where1 = {};
      where1['name'] = {
        contains: findSchoolDto.region_name
      }
      
      const region = await this.prismaService.region.findFirst({where: where1});
      if (!region) throw new BadRequestException('Region not found');
      where0['region_id'] = region.id;
    } 
    return this.prismaService.school.findMany({where: where0, include: {region: true, teachers_workplaces: true}});
  }

  /** GET ONE SCHOOL BY ID */
  async findOneSchool(id: string) {
    const school = await this.prismaService.school.findFirst({where: {id}, include: {region: true, teachers_workplaces: true}});
    if (!school) throw new BadRequestException('School not found!');
    return school;
  }

  /** UPDATE ONE SCHOOL BY ID */
  async updateSchool(id: string, updateSchoolDto: UpdateSchoolDto) {
    const school = await this.prismaService.school.findFirst({where: {id}});
    if (!school) throw new BadRequestException('School not found!');
    const region = await this.prismaService.region.findFirst({where: {id: updateSchoolDto.region_id}})
    if (!region) throw new BadRequestException('Region id not found!')
    const updatedSchool = await this.prismaService.school.update({
      data: {...updateSchoolDto},
      where: {id}
    })
    return updatedSchool;
  }

  /** DELETE ONE SCHOOL BY ID */
  async removeSchool(id: string) {
    const school = await this.prismaService.school.findFirst({where: {id}});
    if (!school) throw new BadRequestException('School not found!');
    return this.prismaService.school.delete({where: {id}});
  }
}
