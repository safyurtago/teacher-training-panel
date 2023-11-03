import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCheckWithTaskCriteriaDto, UpdateCheckWithTaskCriteriaDto, FindCheckWithTaskCriteriaDto } from './dto';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CheckWithTaskCriteriasService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  /** CRAETE CheckWithTaskCriterias */
   async create(createCheckWithTaskCriteriaDto: CreateCheckWithTaskCriteriaDto) {
    const {task_applyId, task_criteriaId, description, criteria_score, } = createCheckWithTaskCriteriaDto;
    const taskApply = await this.prismaService.taskApply.findFirst({where: {id: task_applyId}})
    if (!taskApply) { throw new BadRequestException('Task Apply not found'); }
    const taskCriteria = await this.prismaService.taskCriteria.findFirst({where: {id: task_criteriaId}});
    if (!taskCriteria) { throw new BadRequestException('Task Criteria not found'); }
    const findOne = await this.prismaService.checkWithTaskCriterias.findFirst({where: {task_applyId, task_criteriaId}});
    if (findOne) throw new BadRequestException('This is already checked')
    if (criteria_score > taskCriteria.value) throw new BadRequestException('Invalid Score!')
    await this.prismaService.taskApply.update({data: {overall_score: (taskApply.overall_score + criteria_score)}, where: {id: task_applyId}})
    return this.prismaService.checkWithTaskCriterias.create({data: createCheckWithTaskCriteriaDto});
  }

  /** FIND CheckWithTaskCriterias */
  async findAllByTeacher(findCheckWithTaskCriteriaDto: FindCheckWithTaskCriteriaDto, req: Request) {
    const teacherId = req['teacher'];
    const taskApply = await this.prismaService.taskApply.findFirst({where: {teacherId}});
    if (!taskApply) throw new BadRequestException('Task Criterias not found for you');
    let where1 = {};
    if (findCheckWithTaskCriteriaDto.description) where1['description'] = {contains: findCheckWithTaskCriteriaDto.description}
    if (findCheckWithTaskCriteriaDto.criteria_score) where1['criteria_score'] = findCheckWithTaskCriteriaDto.criteria_score
    if (findCheckWithTaskCriteriaDto.task_criteriaId) where1['task_criteriaId'] = findCheckWithTaskCriteriaDto.task_criteriaId

    return this.prismaService.checkWithTaskCriterias.findMany({where: {...where1, task_applyId: taskApply.id}});
  }

  /** FIND CheckWithTaskCriterias */
  async findOneByTeacher(id: string, req: Request) {
    const teacherId = req['teacher'];
    const findOne = await this.prismaService.checkWithTaskCriterias.findFirst({where: {id}});
    if (!findOne) { throw new BadRequestException('Checking is not found') }
    const taskApply = await this.prismaService.taskApply.findFirst({where: {id: findOne.task_applyId}})
    if (teacherId !== taskApply.teacherId) { throw new BadRequestException('You do not have permission') }
    return findOne;
  }

  /** FIND CheckWithTaskCriterias */
  async findOneByAdmin(id: string) {
    const findOne = await this.prismaService.checkWithTaskCriterias.findFirst({where: {id}});
    if (!findOne) { throw new BadRequestException('Checking is not found') }
    return findOne;
  }

  /** FIND CheckWithTaskCriterias */
  findAllByAdmin(findCheckWithTaskCriteriaDto: FindCheckWithTaskCriteriaDto) {
    let where1 = {};
    if (findCheckWithTaskCriteriaDto.description) where1['description'] = {contains: findCheckWithTaskCriteriaDto.description}
    if (findCheckWithTaskCriteriaDto.criteria_score) where1['criteria_score'] = findCheckWithTaskCriteriaDto.criteria_score
    if (findCheckWithTaskCriteriaDto.task_applyId) where1['task_applyId'] = findCheckWithTaskCriteriaDto.task_applyId
    if (findCheckWithTaskCriteriaDto.task_criteriaId) where1['task_criteriaId'] = findCheckWithTaskCriteriaDto.task_criteriaId
    
    return this.prismaService.checkWithTaskCriterias.findMany({where: {...where1, }});
  }

  /** UPDATE CheckWithTaskCriterias */
  async update(id: string, updateCheckWithTaskCriteriaDto: UpdateCheckWithTaskCriteriaDto) {
    const {task_applyId, task_criteriaId, description, criteria_score, } = updateCheckWithTaskCriteriaDto;
    const taskApply = await this.prismaService.taskApply.findFirst({where: {id: task_applyId}})
    if (!taskApply) { throw new BadRequestException('Task Apply not found'); }
    const findOne = await this.prismaService.checkWithTaskCriterias.findFirst({where: {id}});
    if (!findOne) { throw new BadRequestException('Checking is not found') }
    const taskCriteria = await this.prismaService.taskCriteria.findFirst({where: {id: task_criteriaId}});
    if (!taskCriteria) { throw new BadRequestException('Task Criteria not found'); }
    if (criteria_score > taskCriteria.value) throw new BadRequestException('Invalid Score!')
    await this.prismaService.taskApply.update({data: {overall_score: (taskApply.overall_score - findOne.criteria_score + criteria_score)}, where: {id: task_applyId}})

    return this.prismaService.checkWithTaskCriterias.update({data: updateCheckWithTaskCriteriaDto, where: {id}});
  }

  /** DELETE CheckWithTaskCriterias */
  async remove(id: string) {
    const findOne = await this.prismaService.checkWithTaskCriterias.findFirst({where: {id}});
    if (!findOne) { throw new BadRequestException('Checking is not found') }
    return this.prismaService.checkWithTaskCriterias.delete({where: {id}});
  }
}
