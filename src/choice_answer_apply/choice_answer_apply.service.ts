import { FindChoiceAnswerApplyDto } from './dto/find-choice_answer_apply.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChoiceAnswerApplyDto } from './dto/create-choice_answer_apply.dto';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { ChoiceAnswerApply } from './entities/choice_answer_apply.entity';

@Injectable()
export class ChoiceAnswerApplyService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  /** CREATE  ChoiceAnswerApply */
  async create(createChoiceAnswerApplyDto: CreateChoiceAnswerApplyDto, req: Request) {
    const teacherId = req['teacher'].id;
    const {key, answerId} = createChoiceAnswerApplyDto;
    const findApply = await this.prismaService.choiceAnswerApply.findFirst({where: {teacherId, answerId}});
    if (findApply) throw new BadRequestException("You have already applied for this question!")
    const answer = await this.prismaService.choiceAnswer.findFirstOrThrow({where: {id: answerId}});
    if (!answer) throw new BadRequestException('Choice Answer Not Found!')
    const question = await this.prismaService.choiceQuestion.findFirst({where: {id: answer.questionId}});
    let apply: ChoiceAnswerApply;
    if (createChoiceAnswerApplyDto.key === question.correct_choice) {
      apply = await this.prismaService.choiceAnswerApply.create({data: {key, answerId, teacherId, is_correct: true}});
    } else {
      apply = await this.prismaService.choiceAnswerApply.create({data: {key, answerId, teacherId, is_correct: false}});
    }
    return apply;
  }

  /** FIND ALL ChoiceAnswerApply By TEACHER */
  async findAllByTeacher(findChoiceAnswerApplyDto: FindChoiceAnswerApplyDto, req: Request) {
    const teacherId = req['teacher'].id;
    let where1 = {};
    const { key, is_correct, answerId } = findChoiceAnswerApplyDto;
    if (key) where1['key'] = key;
    if (is_correct !== undefined) where1['is_correct'] = is_correct;
    if (answerId) where1['answer_id'] = answerId;
    
    return this.prismaService.choiceAnswerApply.findMany({where: {teacherId, ...where1}, include: {teacher: true, answer: true}});
  }

  /** FIND ALL ChoiceAnswerApply By ADMIN */
  async findAllByAdmin(findChoiceAnswerApplyDto: FindChoiceAnswerApplyDto) {
    let where1 = {};
    const { key, is_correct, answerId, teacherId } = findChoiceAnswerApplyDto;
    if (key) where1['key'] = key;
    if (is_correct !== undefined) where1['is_correct'] = is_correct;
    if (answerId) where1['answerId'] = answerId;
    if (teacherId) where1['teacherId'] = teacherId;
    
    return this.prismaService.choiceAnswerApply.findMany({where: {...where1}, include: {teacher: true, answer: true}});
  }

  /** FIND ONE ChoiceAnswerApply By TEACHER */
  async findOneByTeacher(id: string, req: Request) {
    const teacherId = req['teacher'].id;
    const findApply = await this.prismaService.choiceAnswerApply.findFirst({where: {id}});
    if (!findApply) { throw new BadRequestException('Apply not found'); }
    if (findApply.teacherId !== teacherId) { throw new BadRequestException('You do not have permission')};
    return findApply;
  }

  /** FIND ONE ChoiceAnswerApply  By ADMIN*/
  async findOneByAdmin(id: string) {
    const findApply = await this.prismaService.choiceAnswerApply.findFirst({where: {id}});
    if (!findApply) { throw new BadRequestException('Apply not found'); }
    return findApply;
  }

  /** DELETE ChoiceAnswerApply By Admin */
  async remove(id: string) {
    const findApply = await this.prismaService.choiceAnswerApply.findFirst({where: {id}});
    if (!findApply) { throw new BadRequestException('Apply not found'); }
    return this.prismaService.choiceAnswerApply.delete({where: {id}});
  }
}
