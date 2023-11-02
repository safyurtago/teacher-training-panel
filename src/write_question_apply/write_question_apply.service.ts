import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWriteQuestionApplyDto, FindWriteQuestionApplyDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class WriteQuestionApplyService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  /** CREATE WriteQuestionApply By TEACHER */
  async create(createWriteQuestionApplyDto: CreateWriteQuestionApplyDto, req: Request) {
    const teacherId = req['teacher'].id;
    const question = await this.prismaService.writeQuestion.findFirst({where: {id: createWriteQuestionApplyDto.questionId}});
    if (!question) { throw new BadRequestException('Write Question not found'); }
    const apply = await this.prismaService.writeQuestionApply.findFirst({where: {teacherId, questionId: createWriteQuestionApplyDto.questionId}})
    if (apply) throw new BadRequestException('You already applied for this question')
    return this.prismaService.writeQuestionApply.create({data: {teacherId: teacherId, ...createWriteQuestionApplyDto}});
  }

  /** FIND ALL WriteQuestionApply By TEACHER */
  findAllByTeacher(findWriteQuestionApplyDto: FindWriteQuestionApplyDto, req: Request){
    const teacherId = req['teacher'].id;
    let where1 = {};
    if (findWriteQuestionApplyDto.is_correct !== undefined) {where1['is_correct'] = findWriteQuestionApplyDto.is_correct}
    if (findWriteQuestionApplyDto.questionId) {where1['questionId'] = findWriteQuestionApplyDto.questionId}
    if (findWriteQuestionApplyDto.value) {where1['value'] = {contains: findWriteQuestionApplyDto.value}}

    return this.prismaService.writeQuestionApply.findMany({where: {...where1, teacherId}, include: {teacher: true, question: true}});
  }

  /** FIND ALL WriteQuestionApply By ADMIN */
  findAllByAdmin(findWriteQuestionApplyDto: FindWriteQuestionApplyDto) {
    let where1 = {};
    if (findWriteQuestionApplyDto.is_correct !== undefined) {where1['is_correct'] = findWriteQuestionApplyDto.is_correct}
    if (findWriteQuestionApplyDto.questionId) {where1['questionId'] = findWriteQuestionApplyDto.questionId}
    if (findWriteQuestionApplyDto.value) {where1['value'] = {contains: findWriteQuestionApplyDto.value}}

    return this.prismaService.writeQuestionApply.findMany({where: where1, include: {teacher: true, question: true}});
  }

  /** FIND WriteQuestionApply By TEACHER */
  async findOneByTeacher(id: string, req: Request) {
    const teacherId = req['teacher'].id;
    const apply = await this.prismaService.writeQuestionApply.findFirst({where: {id}})
    if (!apply) { throw new BadRequestException('Write question apply not found')}
    if (apply.teacherId !== teacherId) { throw new BadRequestException('you do not have permission '); }
    return apply;
  }

  /** FIND WriteQuestionApply By TEACHER */
  async findOneByAdmin(id: string) {
    const apply = await this.prismaService.writeQuestionApply.findFirst({where: {id}})
    if (!apply) { throw new BadRequestException('Write question apply not found')}
    return apply;
  }

  /** DELETE WriteQuestionApply By ADMIN */
  async remove(id: string) {
    const apply = await this.prismaService.writeQuestionApply.findFirst({where: {id}})
    if (!apply) { throw new BadRequestException('Write question apply not found')}
    return this.prismaService.writeQuestionApply.delete({where: {id}});
  }
}
