import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';
import { CreateLessonDto, FindLessonDto, UpdateLessonDto } from './dto';

@Injectable()
export class LessonService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  /** Create Lesson By Admin */
  async create(createLessonDto: CreateLessonDto, image: any) {
    const findLesson = await this.prismaService.lesson.findUnique({where: {title: createLessonDto.title}});
    if (findLesson) throw new BadRequestException('Lesson already exists')
    if (image==undefined) {
      return this.prismaService.lesson.create({data: {title: createLessonDto.title, description: createLessonDto.description}})
    }
    const fileName = await this.fileService.createFile(image);
    return this.prismaService.lesson.create({data: {title: createLessonDto.title, description: createLessonDto.description, file: fileName}});
  }

  findAll(findLessonDto: FindLessonDto) {
    let where = {};
    if (findLessonDto.title) where['title'] = {contains: findLessonDto.title}
    if (findLessonDto.description) where['description'] = {contains: findLessonDto.description}
    return this.prismaService.lesson.findMany({where, include: {tasks: true}});
  }

  async findOne(id: string) {
    const findLesson = await this.prismaService.lesson.findFirst({where: {id}});
    if (!findLesson) throw new BadRequestException('Lesson not found');
    return findLesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto, image: any) {
    const findLesson = await this.prismaService.lesson.findFirst({where: {id}});
    if (!findLesson) throw new BadRequestException('Lesson not found');
    if (image==undefined) {
      return this.prismaService.lesson.update({
        data: {title: updateLessonDto.title, description: updateLessonDto.description},
        where: {id}
      });
    }
    const fileName = await this.fileService.createFile(image);
    return this.prismaService.lesson.update({data: {title: updateLessonDto.title, description: updateLessonDto.description}, where: {id}});
  }

  async remove(id: string) {
    const findLesson = await this.prismaService.lesson.findFirst({where: {id}});
    if (!findLesson) throw new BadRequestException('Lesson not found');
    return this.prismaService.lesson.delete({where: {id}});
  }
}
