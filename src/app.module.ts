import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
import { TeacherModule } from './teacher/teacher.module';
import { RegionModule } from './region/region.module';
import { SchoolModule } from './school/school.module';
import { TeacherWorkplaceModule } from './teacher_workplace/teacher_workplace.module';
import { TeacherPersonalInfoModule } from './teacher_personal_info/teacher_personal_info.module';
import { FileModule } from './file/file.module';
import { ChoiceQuestionModule } from './choice_question/choice_question.module';
import { ChoiceAnswerModule } from './choice_answer/choice_answer.module';
import { ChoiceAnswerApplyModule } from './choice_answer_apply/choice_answer_apply.module';
import { WriteQuestionModule } from './write_question/write_question.module';
import { WriteQuestionApplyModule } from './write_question_apply/write_question_apply.module';
import { TrainingModule } from './training/training.module';
import { TrainingApplyModule } from './training_apply/training_apply.module';
import { CheckTrainingApplyModule } from './check_training_apply/check_training_apply.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AdminModule,
    PrismaModule,
    MailModule,
    TeacherModule,
    RegionModule,
    SchoolModule,
    TeacherWorkplaceModule,
    TeacherPersonalInfoModule,
    FileModule,
    ChoiceQuestionModule,
    ChoiceAnswerModule,
    ChoiceAnswerApplyModule,
    WriteQuestionModule,
    WriteQuestionApplyModule,
    TrainingModule,
    TrainingApplyModule,
    CheckTrainingApplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
