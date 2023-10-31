import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [TeacherController],
  providers: [TeacherService, AdminGuard],
})
export class TeacherModule {}
