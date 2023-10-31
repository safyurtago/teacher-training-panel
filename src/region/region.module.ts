import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
  ],
  controllers: [RegionController],
  providers: [RegionService, AdminGuard],
})
export class RegionModule {}
