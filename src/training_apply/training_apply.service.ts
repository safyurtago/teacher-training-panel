import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTrainingApplyDto, FindTrainingApplyDto } from './dto';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';

@Injectable()
export class TrainingApplyService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}
  /** Create TrainingApply */
  async create(createTrainingApplyDto: CreateTrainingApplyDto, image: any, req: Request) {
    const teacherId = req['teacher'].id;
    const apply = await this.prismaService.trainingApply.findFirst({where: {teacherId}});
    if (apply) throw new BadRequestException('You already have applied');
    const training = await this.prismaService.training.findFirst({where: {id: createTrainingApplyDto.trainingId}});
    if (!training) { throw new BadRequestException('Training not found') };
    if (image == undefined) {
      return this.prismaService.trainingApply.create({data: {...createTrainingApplyDto, teacherId}});
    }
    const fileName = await this.fileService.createFile(image);
    return this.prismaService.trainingApply.create({data: {...createTrainingApplyDto, teacherId, file: fileName}})
  }

  /** Find ALL TrainingApply By Teacher*/
  findAllByTeacher(findTrainingApplyDto: FindTrainingApplyDto, req: Request) {
    const teacherId = req['teacher'].id;
    let where1 = {};
    if (findTrainingApplyDto.text) where1['text'] = {contains: findTrainingApplyDto.text}
    if (findTrainingApplyDto.trainingId) where1['trainingId'] = findTrainingApplyDto.teacherId;
    return this.prismaService.trainingApply.findMany({where: {...where1, teacherId}, include: {train: true, checking_applys: true, teacher: true}});
  }

  /** Find ALL TrainingApply By Admin*/
  findAllByAdmin(findTrainingApplyDto: FindTrainingApplyDto) {
    let where1 = {};
    if (findTrainingApplyDto.text) where1['text'] = {contains: findTrainingApplyDto.text}
    if (findTrainingApplyDto.trainingId) where1['trainingId'] = findTrainingApplyDto.teacherId;
    if (findTrainingApplyDto.teacherId) where1['teacherId'] = findTrainingApplyDto.teacherId;
    return this.prismaService.trainingApply.findMany({where: {...where1}, include: {train: true, checking_applys: true, teacher: true}});
  }

  /** Find One TrainingApply By Teacher*/
  async findOneByTeacher(id: string, req: Request) {
    const teacherId = req['teacher'].id;
    const apply = await this.prismaService.trainingApply.findFirst({where: {id}, include: {teacher: true, checking_applys: true, train: true}});
    if (!apply) throw new BadRequestException('Apply not found');
    if (apply.teacherId !== teacherId) throw new BadRequestException('You do not have permission');
    return apply;
  }

  /** Find One TrainingApply By Admin*/
  async findOneByAdmin(id: string) {
    const apply = await this.prismaService.trainingApply.findFirst({where: {id}, include: {teacher: true, checking_applys: true, train: true}});
    if (!apply) throw new BadRequestException('Training not found');
    const updatedApply = await this.prismaService.trainingApply.update({data: {is_seen: true}, where: {id}, include: {teacher: true, checking_applys: true, train: true}});
    return updatedApply;
  }

  /** Delete One TrainingApply */
  async remove(id: string) {
    const apply = await this.prismaService.trainingApply.findFirst({where: {id}, include: {teacher: true, checking_applys: true, train: true}});
    if (!apply) throw new BadRequestException('Training not found');
    return this.prismaService.trainingApply.delete({where: {id}});
  }
}
