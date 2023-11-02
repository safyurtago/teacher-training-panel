import { Module } from '@nestjs/common';
import { CheckTrainingApplyService } from './check_training_apply.service';
import { CheckTrainingApplyController } from './check_training_apply.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [CheckTrainingApplyController],
  providers: [CheckTrainingApplyService, AdminGuard],
})
export class CheckTrainingApplyModule {}
