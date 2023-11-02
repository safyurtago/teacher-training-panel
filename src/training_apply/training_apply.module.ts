import { Module } from '@nestjs/common';
import { TrainingApplyService } from './training_apply.service';
import { TrainingApplyController } from './training_apply.controller';

@Module({
  controllers: [TrainingApplyController],
  providers: [TrainingApplyService],
})
export class TrainingApplyModule {}
