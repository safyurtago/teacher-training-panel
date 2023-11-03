import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskApplyDto, FindTaskApplyDto, UpdateTaskApplyDto } from './dto';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';

@Injectable()
export class TaskApplyService {
  constructor (
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}
  /** CREATE TASKAPPLY */
  async create(createTaskApplyDto: CreateTaskApplyDto, req: Request, image: any) {
    const teacherId = req['teacher'].id;
    const {taskId, description } = createTaskApplyDto;
    const task = await this.prismaService.task.findFirst({where: {id: taskId}})
    if (!task) { throw new BadRequestException('Task not found')}
    const findTeacherTask = await this.prismaService.taskApply.findFirst({where: {taskId, teacherId}});
    if (findTeacherTask) throw new BadRequestException('You already have applied for this task!')
    if (image==undefined) {
      return this.prismaService.taskApply.create({data: {description, taskId, teacherId}})
    };
    const fileName = await this.fileService.createFile(image);
    return this.prismaService.taskApply.create({data: {description, taskId, teacherId, file: fileName}})
  }

  /** FIND TASKAPPLY */
  findAllByTeacher(findTaskApplyDto: FindTaskApplyDto, req: Request) {
    const teacherId = req['teacher'].id;
    let where1 = {};
    if (findTaskApplyDto.description) where1['description'] = {contains: findTaskApplyDto.description}
    if (findTaskApplyDto.overal_score) where1['overal_score'] = findTaskApplyDto.overal_score
    if (findTaskApplyDto.taskId) where1['taskId'] = findTaskApplyDto.taskId
    return this.prismaService.taskApply.findMany({where: {...where1, teacherId}, include: {task: true, teacher: true, check_task_criterias: true}});
  }

  /** FIND TASKAPPLY */
  findAllByAdmin(findTaskApplyDto: FindTaskApplyDto) {
    let where1 = {};
    if (findTaskApplyDto.description) where1['description'] = {contains: findTaskApplyDto.description}
    if (findTaskApplyDto.overal_score) where1['overal_score'] = findTaskApplyDto.overal_score
    if (findTaskApplyDto.taskId) where1['taskId'] = findTaskApplyDto.taskId
    if (findTaskApplyDto.teacherId) where1['teacherId'] = findTaskApplyDto.teacherId
    return this.prismaService.taskApply.findMany({where: {...where1}, include: {task: true, teacher: true, check_task_criterias: true}});
  }

  /** FIND TASKAPPLY */
  async findOneByTeacher(id: string, req: Request) {
    const teacherId = req['teacher'].id;
    const apply = await this.prismaService.taskApply.findFirst({where: {id}, include: {task: true, teacher: true, check_task_criterias: true}});
    if (!apply) { throw new BadRequestException('Task Apply Not Found') };
    if (apply.teacherId != teacherId) throw new BadRequestException('You do not have permission ');
    return apply;
  }

  /** FIND TASKAPPLY */
  async findOneByAdmin(id: string) {
    const apply = await this.prismaService.taskApply.findFirst({where: {id}, include: {task: true, teacher: true, check_task_criterias: true}});
    if (!apply) { throw new BadRequestException('Task Apply Not Found') };
    return apply;
  }

  /** UPDATE TASKAPPLY */
  async update(id: string, updateTaskApplyDto: UpdateTaskApplyDto, req: Request, image: any) {
    const apply = await this.prismaService.taskApply.findFirst({where: {id}});
    if (!apply) { throw new BadRequestException('Task Apply Not Found') };
    let fileName: any;
    if (image != undefined) {
      fileName = this.fileService.createFile(image);
      updateTaskApplyDto['file'] = fileName;
    } 
    return this.prismaService.taskApply.update({data: updateTaskApplyDto, where: {id}});
  }

  /** DELETE TASKAPPLY */
  async remove(id: string) {
    const apply = await this.prismaService.taskApply.findFirst({where: {id}});
    if (!apply) { throw new BadRequestException('Task Apply Not Found') };
    return this.prismaService.taskApply.delete({where: {id}});
  }
}
