import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';
import { FindTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  /** Create Task */
  async create(createTaskDto: CreateTaskDto, image: any) {
    const {title, description,lessonId, score} = createTaskDto;
    const lesson = await this.prismaService.lesson.findFirst({where: {id: lessonId}})
    if (!lesson) { throw new BadRequestException('Lesson not found') }
    if (image == undefined) return this.prismaService.task.create({data: {title, description, lessonId, score: +score}}) ;
    const fileName = await this.fileService.createFile(image);
    return this.prismaService.task.create({data: {title, description, lessonId, file: fileName, score: +score}}) ;
  }

  /** Find All Task */
  findAll(findTaskDto: FindTaskDto) {
    let where = {};
    if (findTaskDto.title) where['title'] = {contains: findTaskDto.title};
    if (findTaskDto.description) where['description'] = {contains: findTaskDto.description};
    if (findTaskDto.lessonId) where['lessonId'] = findTaskDto.lessonId
    if (findTaskDto.score) where['score'] = +findTaskDto.score
    return this.prismaService.task.findMany({where, include: {lesson: true, criterias: true}});
  }

  /** Find One Task */
  async findOne(id: string) {
    const findTask = await this.prismaService.task.findFirst({where: {id}});
    if (!findTask) throw new BadRequestException("Task not found");
    return findTask;
  }

  /** Update One Task */
  async update(id: string, updateTaskDto: UpdateTaskDto, image: any) {
    const findTask = await this.prismaService.task.findFirst({where: {id}});
    if (!findTask) throw new BadRequestException("Task not found");
    const {title, description, score} = updateTaskDto;
    if (image == undefined) return this.prismaService.task.update({data: {title, description}, where: {id}}) ;
    const fileName = await this.fileService.createFile(image);
    return this.prismaService.task.update({data: {title, description, file: fileName, score: +score}, where: {id}});
  }

  /** Delete One Task */
  async remove(id: string) {
    const findTask = await this.prismaService.task.findFirst({where: {id}});
    if (!findTask) throw new BadRequestException("Task not found");
    return this.prismaService.task.delete({where: {id}});
  }
}
