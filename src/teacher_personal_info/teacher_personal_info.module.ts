
import { Module } from '@nestjs/common';
import { TeacherPersonalInfoService } from './teacher_personal_info.service';
import { TeacherPersonalInfoController } from './teacher_personal_info.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    FileModule,
  ],
  controllers: [TeacherPersonalInfoController],
  providers: [TeacherPersonalInfoService, AdminGuard, TeacherGuard],
})
export class TeacherPersonalInfoModule {}
