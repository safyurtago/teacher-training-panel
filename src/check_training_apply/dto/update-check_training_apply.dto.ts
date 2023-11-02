import { PartialType } from '@nestjs/swagger';
import { CreateCheckTrainingApplyDto } from './create-check_training_apply.dto';

export class UpdateCheckTrainingApplyDto extends PartialType(CreateCheckTrainingApplyDto) {}
