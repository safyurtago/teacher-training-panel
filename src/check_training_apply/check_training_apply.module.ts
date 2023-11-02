import { Module } from '@nestjs/common';
import { CheckTrainingApplyService } from './check_training_apply.service';
import { CheckTrainingApplyController } from './check_training_apply.controller';

@Module({
  controllers: [CheckTrainingApplyController],
  providers: [CheckTrainingApplyService],
})
export class CheckTrainingApplyModule {}
