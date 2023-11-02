import { Injectable } from '@nestjs/common';
import { CreateCheckTrainingApplyDto } from './dto/create-check_training_apply.dto';
import { UpdateCheckTrainingApplyDto } from './dto/update-check_training_apply.dto';

@Injectable()
export class CheckTrainingApplyService {
  create(createCheckTrainingApplyDto: CreateCheckTrainingApplyDto) {
    return 'This action adds a new checkTrainingApply';
  }

  findAll() {
    return `This action returns all checkTrainingApply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkTrainingApply`;
  }

  update(id: number, updateCheckTrainingApplyDto: UpdateCheckTrainingApplyDto) {
    return `This action updates a #${id} checkTrainingApply`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkTrainingApply`;
  }
}
