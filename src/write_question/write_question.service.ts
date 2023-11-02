import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWriteQuestionDto, FindWriteQuestionDto, UpdateWriteQuestionDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WriteQuestionService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  /** CREATE WriteQuestion By ADMIN */
  create(createWriteQuestionDto: CreateWriteQuestionDto) {
    return this.prismaService.writeQuestion.create({data: createWriteQuestionDto});
  }

  /** FIND ALL WriteQuestions */
  findAll(findWriteQuestionDto: FindWriteQuestionDto) {
    const {text, correct_answer} = findWriteQuestionDto;
    let where = {};
    if (text) where['text'] = {contains: text};
    if (correct_answer) where['correct_answer'] = {contains: correct_answer};
    return this.prismaService.writeQuestion.findMany({where, include: {question_applys: true}});
  }

  /** FIND ONE WriteQuestion */
  async findOne(id: string) {
    const findQuestion = await this.prismaService.writeQuestion.findFirst({where: {id}, include: {question_applys: true}});
    if (!findQuestion) throw new BadRequestException('Write Question not found!');
    return findQuestion;
  }

  /** UPDATE ONE WriteQuestion By ADMIN */
  async update(id: string, updateWriteQuestionDto: UpdateWriteQuestionDto) {
    const findQuestion = await this.prismaService.writeQuestion.findFirst({where: {id}});
    if (!findQuestion) throw new BadRequestException('Write Question not found!');
    return this.prismaService.writeQuestion.update({
      data: updateWriteQuestionDto,
      where: {id}
    });
  }

  /** DELETE ONE WriteQuestion By ADMIN */
  async remove(id: string) {
    const findQuestion = await this.prismaService.writeQuestion.findFirst({where: {id}});
    if (!findQuestion) throw new BadRequestException('Write Question not found!');
    return this.prismaService.writeQuestion.delete({where: {id}});
  }
}
