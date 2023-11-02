import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckTrainingApplyDto, FindCheckTrainingApplyDto, UpdateCheckTrainingApplyDto } from './dto';

@Injectable()
export class CheckTrainingApplyService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  /** Create CheckTrainingApply By Admin */
  async create(createCheckTrainingApplyDto: CreateCheckTrainingApplyDto) {
    const {score, training_applyId, description} = createCheckTrainingApplyDto;
    const apply = await this.prismaService.trainingApply.findFirst({where: {id: createCheckTrainingApplyDto.training_applyId}});
    if (!apply) { throw new BadRequestException('Could not find training applied') };
    const findCheck = await this.prismaService.checkTrainingApply.findFirst({where: {training_applyId: createCheckTrainingApplyDto.training_applyId}});
    if (findCheck) { throw new BadRequestException('Already Checked');}
    await this.prismaService.trainingApply.update({data: {is_seen: true}, where: {id: apply.id}});
    return this.prismaService.checkTrainingApply.create({data: {score: +score, description, training_applyId}, include: {training_apply: true}});
  }

  /** Find All CheckTrainingApply  */
  findAll(findCheckTrainingApplyDto: FindCheckTrainingApplyDto) {
    let where = {};
    if (findCheckTrainingApplyDto.score) { where['score'] = findCheckTrainingApplyDto.score}
    if (findCheckTrainingApplyDto.description) { where['score'] = {contains: findCheckTrainingApplyDto.score}}
    if (findCheckTrainingApplyDto.training_applyId) { where['training_applyId'] = findCheckTrainingApplyDto.training_applyId}
    return this.prismaService.checkTrainingApply.findMany({where, include: {training_apply: true}});
  }

  /** Find One CheckTrainingApply  */
  async findOne(id: string) {
    const find = await this.prismaService.checkTrainingApply.findFirst({where: {id}, include: {training_apply: true}});
    if (!find) throw new BadRequestException('Checking Apply not found')
    return find;
  }

  /** Update CheckTrainingApply By Admin */
  async update(id: string, updateCheckTrainingApplyDto: UpdateCheckTrainingApplyDto) {
    const {score, description} = updateCheckTrainingApplyDto;
    const find = await this.prismaService.checkTrainingApply.findFirst({where: {id}, include: {training_apply: true}});
    if (!find) throw new BadRequestException('Checking Apply not found')
    return this.prismaService.checkTrainingApply.update({data: {score: +score, description}, where: {id}});
  }

  /** Delete CheckTrainingApply By Admin */
  async remove(id: string) {
    const find = await this.prismaService.checkTrainingApply.findFirst({where: {id}, include: {training_apply: true}});
    if (!find) throw new BadRequestException('Checking Apply not found')
    return this.prismaService.checkTrainingApply.delete({where: {id}});
  }
}
