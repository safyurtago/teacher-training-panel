import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChoiceQuestionDto, FindChoiceQuestionDto, UpdateChoiceQuestionDto } from './dto';

@Injectable()
export class ChoiceQuestionService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  /** CREATE CHOICE QUESTION BY ADMIN */
  async create(createChoiceQuestionDto: CreateChoiceQuestionDto) {
    return this.prismaService.choiceQuestion.create({data: createChoiceQuestionDto});
  }

  /** FIND ALL CHOICE QUESTIONS */
  async findAll(findChoiceQuestionDt: FindChoiceQuestionDto) {
    let where = {};
    if (findChoiceQuestionDt.text) { where['text'] = {contains: findChoiceQuestionDt.text} }
    if (findChoiceQuestionDt.description) { where['description'] = {contains: findChoiceQuestionDt.description} }
    return this.prismaService.choiceQuestion.findMany({where, include: {answers: true}});
  }

  /** FIND CHOICE QUESTION */
  async findOne(id: string) {
    const findChoiceQuestion = await this.prismaService.choiceQuestion.findFirst({where: {id}});
    if (!findChoiceQuestion) throw new BadRequestException('Question not found');
    return findChoiceQuestion;
  }

  /** UPDATE CHOICE QUESTION BY ADMIN */
  async update(id: string, updateChoiceQuestionDto: UpdateChoiceQuestionDto) {
    const findChoiceQuestion = await this.prismaService.choiceQuestion.findFirst({where: {id}});
    if (!findChoiceQuestion) throw new BadRequestException('Question not found');
    return this.prismaService.choiceQuestion.update({
      data: updateChoiceQuestionDto,
      where: {id}
    });
  }

  /** DELETE CHOICE QUESTION BY ADMIN */
  async remove(id: string) {
    const findChoiceQuestion = await this.prismaService.choiceQuestion.findFirst({where: {id}});
    if (!findChoiceQuestion) throw new BadRequestException('Question not found');
    return this.prismaService.choiceQuestion.delete({where: {id}});
  }
}
