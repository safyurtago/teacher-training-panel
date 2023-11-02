import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TrainingService } from './training.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Training } from './entities/training.entity';
import { AdminGuard } from '../common/guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTrainingDto, FindTrainingDto, UpdateTrainingDto } from './dto';

@ApiTags('TRAINING')
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiOperation({summary: 'CREATE Training'})
  @ApiResponse({status: 201, type: Training})
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  create(@Body() createTrainingDto: CreateTrainingDto, @UploadedFile() image: any,) {
    return this.trainingService.create(createTrainingDto, image);
  }

  @ApiOperation({summary: 'FIND ALL Training'})
  @ApiResponse({status: 200, type: [Training]})
  @Post('find')
  findAll(@Body() findTrainingDto: FindTrainingDto) {
    return this.trainingService.findAll(findTrainingDto);
  }

  @ApiOperation({summary: 'FIND ONE Training'})
  @ApiResponse({status: 200, type: Training})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.trainingService.findOne(id);
  }

  @ApiOperation({summary: 'UPDATE ONE Training'})
  @ApiResponse({status: 200, type: Training})
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto, @UploadedFile() image: any) {
    return this.trainingService.update(id, updateTrainingDto, image);
  }

  @ApiOperation({summary: 'DELETE ONE Training'})
  @ApiResponse({status: 200, type: Training})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.trainingService.remove(id);
  }
}
