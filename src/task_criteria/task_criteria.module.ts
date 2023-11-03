import { Module } from '@nestjs/common';
import { TaskCriteriaService } from './task_criteria.service';
import { TaskCriteriaController } from './task_criteria.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [TaskCriteriaController],
  providers: [TaskCriteriaService, AdminGuard],
})
export class TaskCriteriaModule {}
