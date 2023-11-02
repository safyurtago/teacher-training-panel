import { Module } from '@nestjs/common';
import { WriteQuestionService } from './write_question.service';
import { WriteQuestionController } from './write_question.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';
import { TeacherGuard } from '../common/guards/teacher.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [WriteQuestionController],
  providers: [WriteQuestionService, AdminGuard, TeacherGuard],
})
export class WriteQuestionModule {}
