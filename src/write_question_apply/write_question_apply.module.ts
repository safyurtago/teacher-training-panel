import { Module } from '@nestjs/common';
import { WriteQuestionApplyService } from './write_question_apply.service';
import { WriteQuestionApplyController } from './write_question_apply.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';
import { TeacherGuard } from '../common/guards/teacher.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [WriteQuestionApplyController],
  providers: [WriteQuestionApplyService, AdminGuard, TeacherGuard],
})
export class WriteQuestionApplyModule {}
