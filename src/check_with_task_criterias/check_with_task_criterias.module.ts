import { Module } from '@nestjs/common';
import { CheckWithTaskCriteriasService } from './check_with_task_criterias.service';
import { CheckWithTaskCriteriasController } from './check_with_task_criterias.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';
import { TeacherGuard } from '../common/guards/teacher.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [CheckWithTaskCriteriasController],
  providers: [CheckWithTaskCriteriasService, AdminGuard, TeacherGuard],
})
export class CheckWithTaskCriteriasModule {}
