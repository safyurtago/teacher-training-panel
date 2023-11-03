import { Module } from '@nestjs/common';
import { TaskApplyService } from './task_apply.service';
import { TaskApplyController } from './task_apply.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { FileModule } from '../file/file.module';
import { AdminGuard } from '../common/guards/admin.guard';
import { TeacherGuard } from '../common/guards/teacher.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    FileModule
  ],
  controllers: [TaskApplyController],
  providers: [TaskApplyService, AdminGuard, TeacherGuard],
})
export class TaskApplyModule {}
