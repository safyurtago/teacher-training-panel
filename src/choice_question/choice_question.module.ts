import { Module } from '@nestjs/common';
import { ChoiceQuestionService } from './choice_question.service';
import { ChoiceQuestionController } from './choice_question.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [ChoiceQuestionController],
  providers: [ChoiceQuestionService, AdminGuard],
})
export class ChoiceQuestionModule {}
