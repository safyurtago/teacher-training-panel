import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { CreateChoiceAnswerDto, FindChoiceAnswerDto, UpdateChoiceAnswerDto } from './dto';

@Injectable()
export class ChoiceAnswerService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  /** CREATE CHOICE ANSWER BY TEACHER */
  async create(createChoiceAnswerDto: CreateChoiceAnswerDto) {
    const question = await this.prismaService.choiceQuestion.findFirst({where: {id: createChoiceAnswerDto.questionId}});
    if (!question) { throw new BadRequestException('Question not found!'); }
    const answer = await this.prismaService.choiceAnswer.findFirst({where: {key: createChoiceAnswerDto.key}});
    if (answer) { throw new BadRequestException('Answer Key Already Exists!');}
    return this.prismaService.choiceAnswer.create({
      data: {
        key: createChoiceAnswerDto.key, questionId: createChoiceAnswerDto.questionId, value: createChoiceAnswerDto.value,
      }
    });
  }

  /** FIND ALL CHOICES  */
  async findAll(findChoiceAnswerDto: FindChoiceAnswerDto) {
    const { key, value, questionId } = findChoiceAnswerDto;
    let where = {};
    if (key) where['key'] = {contains: key}
    if (value) where['value'] = {contains: value}
    if (questionId) where['questionId'] = questionId

    return this.prismaService.choiceAnswer.findMany({where, include: {question: true, choice_answer_applys: true}});
  }

  /** FIND ONE CHOICE */
  async findOne(id: string) {
    const findAnswer = await this.prismaService.choiceAnswer.findFirst({where: {id}, include: {question: true, choice_answer_applys: true}});
    if (!findAnswer) throw new BadRequestException('Choice Answer Not Found!');
    return findAnswer;
  }

  /** UPDATE ONE CHOICE */
  async update(id: string, updateChoiceAnswerDto: UpdateChoiceAnswerDto) {
    const findAnswer = await this.prismaService.choiceAnswer.findFirst({where: {id}});
    if (!findAnswer) throw new BadRequestException('Choice Answer Not Found!');
    return this.prismaService.choiceAnswer.update({
      data: updateChoiceAnswerDto,
      where: {id}
    });
  }

  /** DELETE ONE CHOICE */
  async remove(id: string) {
    const findAnswer = await this.prismaService.choiceAnswer.findFirst({where: {id}});
    if (!findAnswer) throw new BadRequestException('Choice Answer Not Found!');
    return this.prismaService.choiceAnswer.delete({where: {id}});
  }
}
