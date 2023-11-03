import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { FileModule } from '../file/file.module';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    FileModule,
  ],
  controllers: [LessonController],
  providers: [LessonService, AdminGuard],
})
export class LessonModule {}
