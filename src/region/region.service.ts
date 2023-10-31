import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegionService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  /** CREATE REGION BY ADMIN */
  async createRegion(createRegionDto: CreateRegionDto) {
    const findRegion = await this.prismaService.region.findUnique({where: {name: createRegionDto.name}});
    if (findRegion) throw new BadRequestException('Region already exists!');
    return this.prismaService.region.create({data: createRegionDto});
  }

  /** FIND ALL FILTERED ADMINS */
  async findAll(createRegionDto: CreateRegionDto) {
    let where = {};
    if (createRegionDto.name) {
      where['name'] = {
        contains: createRegionDto.name
      }
    };
    return this.prismaService.region.findMany({include: {schools: true}}); // SHOULD BE FIXED ----------------------------------------------------------------
  }

  /** FIND ONE ADMIN BY ID*/
  async findOne(id: string) {
    const region = await this.prismaService.region.findFirst({where: {id}, include: {schools: true}});
    if (!region) throw new BadRequestException('Region not found!');
    return region;
  }

  /** UPDATE ONE ADMIN BY ID*/
  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const findRegion = await this.prismaService.region.findFirst({where: {id}});
    if (!findRegion) throw new BadRequestException("Region not found")
    return this.prismaService.region.update({
      data: {...updateRegionDto},
      where: {id}
    });
  }

  /** UPDATE ONE ADMIN BY ID*/
  async remove(id: string) {
    const findRegion = await this.prismaService.region.findFirst({where: {id}});
    if (!findRegion) throw new BadRequestException("Region not found")
    return this.prismaService.region.delete({where: {id}});
  }
}
