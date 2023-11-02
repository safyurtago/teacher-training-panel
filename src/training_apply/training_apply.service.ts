import { Injectable } from '@nestjs/common';
import { CreateTrainingApplyDto } from './dto/create-training_apply.dto';
import { UpdateTrainingApplyDto } from './dto/update-training_apply.dto';

@Injectable()
export class TrainingApplyService {
  create(createTrainingApplyDto: CreateTrainingApplyDto) {
    return 'This action adds a new trainingApply';
  }

  findAll() {
    return `This action returns all trainingApply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingApply`;
  }

  update(id: number, updateTrainingApplyDto: UpdateTrainingApplyDto) {
    return `This action updates a #${id} trainingApply`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingApply`;
  }
}
