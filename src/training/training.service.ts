import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';
import { CreateTrainingDto, FindTrainingDto, UpdateTrainingDto } from './dto';

@Injectable()
export class TrainingService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  /** CREATE Training By ADMIN */
  async create(createTrainingDto: CreateTrainingDto, image: any) {
    const {title, subject, pass_score, max_score, description} = createTrainingDto;
    if (image==undefined) {
      return this.prismaService.training.create({data: {title, subject, pass_score: +pass_score, max_score: +max_score, description}});
    }
    
    const fileName = await this.fileService.createFile(image);
    return this.prismaService.training.create({data: {title, subject, pass_score: +pass_score, max_score: +max_score, description, file: fileName}})
  }
  /** FIND ALL Training */
  findAll(findTrainingDto: FindTrainingDto) {
    let where1 = {};
    
    if (findTrainingDto.description) where1['description'] = {contains: findTrainingDto.description};
    if (findTrainingDto.subject) where1['subject'] = {contains: findTrainingDto.subject};
    if (findTrainingDto.title) where1['title'] = {contains: findTrainingDto.title};
    if (findTrainingDto.max_score) where1['max_score'] = +findTrainingDto.max_score;
    if (findTrainingDto.pass_score) where1['pass_score'] = +findTrainingDto.pass_score;
    return this.prismaService.training.findMany({where: where1, include: {training_applys: true}});
  }

  /** FIND ONE Training */
  async findOne(id: string) {
    const findTraining = await this.prismaService.training.findFirst({where: {id}, include: {training_applys: true}});
    if (!findTraining) throw new BadRequestException(`Training not found`);
    return findTraining;
  }

  /** UPDATE ONE Training */
  async update(id: string, updateTrainingDto: UpdateTrainingDto, image: any) {
    const findTraining = await this.prismaService.training.findFirst({where: {id}})
    if (!findTraining) throw new BadRequestException(`Training not found`);
   if (image==undefined) {
    return this.prismaService.training.update({
      data: updateTrainingDto,
      where: {id},
    });
  }
  const fileName = await this.fileService.createFile(image);
  return this.prismaService.training.update({
    data: {...updateTrainingDto, file: fileName},
    where: {id}
  })
  }

  /** UPDATE ONE Training */
  async remove(id: string) {
    const findTraining = await this.prismaService.training.findFirst({where: {id}})
    if (!findTraining) throw new BadRequestException(`Training not found`);
    return this.prismaService.training.delete({where: {id}});
  }
}
