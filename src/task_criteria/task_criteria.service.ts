import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskCriterionDto, FindTaskCriterionDto, UpdateTaskCriterionDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskCriteriaService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  /** Create TaskCriteria */
  async create(createTaskCriterionDto: CreateTaskCriterionDto) {
    const task = await this.prismaService.task.findFirst({where: {id: createTaskCriterionDto.taskId}})
    if (!task) { throw new BadRequestException('Task not found') }
    const taskCriteria = await this.prismaService.taskCriteria.findFirst({where: {key: createTaskCriterionDto.key}});
    if (taskCriteria) throw new BadRequestException('Already exists this key in criteria');
    const allCriterias = await this.prismaService.taskCriteria.findMany({where: {taskId: task.id}})
    const allValues = allCriterias.reduce((acc, value) => acc + value.value, 0);
    if (allValues + createTaskCriterionDto.value > task.score) { throw new BadRequestException('Criterias scores out of range in Task Score')};
    return this.prismaService.taskCriteria.create({data: createTaskCriterionDto});
  }

  findAll(findTaskCriterionDto: FindTaskCriterionDto) {
    let where = {};
    if (findTaskCriterionDto.description) where['description'] = {contains: findTaskCriterionDto.description};
    if (findTaskCriterionDto.key) where['key'] = {contains: findTaskCriterionDto.key};
    if (findTaskCriterionDto.value) where['value'] = findTaskCriterionDto.value;
    if (findTaskCriterionDto.taskId) where['taskId'] = findTaskCriterionDto.taskId;
    return this.prismaService.taskCriteria.findMany({where, include: {task: true, checks_criterias: true}});
  }

  async findOne(id: string) {
    const criteria = await this.prismaService.taskCriteria.findFirst({where: {id}, include: {task: true, checks_criterias: true}});
    if (!criteria) throw new BadRequestException('Criteria Not Found!');
    return criteria;
  }

  async update(id: string, updateTaskCriterionDto: UpdateTaskCriterionDto) {
    const criteria = await this.prismaService.taskCriteria.findFirst({where: {id}});
    if (!criteria) throw new BadRequestException('Criteria Not Found!');
    const task = await this.prismaService.task.findFirst({where: {id: criteria.taskId}})
    const allCriterias = await this.prismaService.taskCriteria.findMany({where: {taskId: task.id}})
    const allValues = allCriterias.reduce((acc, value) => acc + value.value, 0);
    if (updateTaskCriterionDto.value) {
      const allCriterias = await this.prismaService.taskCriteria.findMany({where: {taskId: task.id}})
      const allValues = allCriterias.reduce((acc, value) => acc + value.value, 0);
      if (allValues + updateTaskCriterionDto.value > task.score) { throw new BadRequestException('Criterias scores out of range in Task Score')};
    }
    return this.prismaService.taskCriteria.update({
      data: updateTaskCriterionDto,
      where: {id}
    });
  }

  async remove(id: string) {
    const criteria = await this.prismaService.taskCriteria.findFirst({where: {id}});
    if (!criteria) throw new BadRequestException('Criteria Not Found!');
    return this.prismaService.taskCriteria.delete({where: {id}});
  }
}
