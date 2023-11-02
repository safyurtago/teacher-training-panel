import { Module } from '@nestjs/common';
import { ChoiceAnswerService } from './choice_answer.service';
import { ChoiceAnswerController } from './choice_answer.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from '../common/guards/admin.guard';
import { TeacherGuard } from '../common/guards/teacher.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({})
  ],
  controllers: [ChoiceAnswerController],
  providers: [ChoiceAnswerService, AdminGuard, TeacherGuard],
})
export class ChoiceAnswerModule {}
