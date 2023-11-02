import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ChoiceAnswerApplyService } from './choice_answer_apply.service';
import { ChoiceAnswerApplyController } from './choice_answer_apply.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [ChoiceAnswerApplyController],
  providers: [ChoiceAnswerApplyService, TeacherGuard, AdminGuard],
})
export class ChoiceAnswerApplyModule {}
