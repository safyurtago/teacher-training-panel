import { Module } from '@nestjs/common';
import { TeacherWorkplaceService } from './teacher_workplace.service';
import { TeacherWorkplaceController } from './teacher_workplace.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { TeacherGuard } from '../common/guards/teacher.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [TeacherWorkplaceController],
  providers: [TeacherWorkplaceService, TeacherGuard],
})
export class TeacherWorkplaceModule {}
