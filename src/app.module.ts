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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
