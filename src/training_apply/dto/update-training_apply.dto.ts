import { PartialType } from '@nestjs/swagger';
import { CreateTrainingApplyDto } from './create-training_apply.dto';

export class UpdateTrainingApplyDto extends PartialType(CreateTrainingApplyDto) {}
