import { Module } from '@nestjs/common';
import { TrainingApplyService } from './training_apply.service';
import { TrainingApplyController } from './training_apply.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { FileModule } from '../file/file.module';
import { AdminGuard } from '../common/guards/admin.guard';
import { TeacherGuard } from '../common/guards/teacher.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    FileModule,
  ],
  controllers: [TrainingApplyController],
  providers: [TrainingApplyService, AdminGuard, TeacherGuard],
})
export class TrainingApplyModule {}
