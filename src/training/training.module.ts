import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    FileModule
  ],
  controllers: [TrainingController],
  providers: [TrainingService, AdminGuard],
})
export class TrainingModule {}
