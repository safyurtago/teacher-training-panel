import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TrainingApplyService } from './training_apply.service';
import { CreateTrainingApplyDto, FindTrainingApplyDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingApply } from './entities/training_apply.entity';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('TRAINING_APPLY')
@Controller('training-apply')
export class TrainingApplyController {
  constructor(private readonly trainingApplyService: TrainingApplyService) {}

  @ApiOperation({summary: 'CREATE Training Apply By Admin'})
  @ApiResponse({status: 201, type: TrainingApply})
  @UseGuards(TeacherGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  create(@Body() createTrainingApplyDto: CreateTrainingApplyDto,  @UploadedFile() image: any, @Req() req: Request) {
    return this.trainingApplyService.create(createTrainingApplyDto, image, req);
  }

  @ApiOperation({summary: 'Find All Training Apply By Teacher'})
  @ApiResponse({status: 200, type: [TrainingApply]})
  @UseGuards(TeacherGuard)
  @Post('find/teacher')
  findAllByTeacher(@Body() findTrainingApplyDto: FindTrainingApplyDto, @Req() req: Request) {
    return this.trainingApplyService.findAllByTeacher(findTrainingApplyDto, req);
  }

  @ApiOperation({summary: 'Find All Training Apply By Admin'})
  @ApiResponse({status: 200, type: [TrainingApply]})
  @UseGuards(AdminGuard)
  @Post('find/admin')
  findAllByAdmin(@Body() findTrainingApplyDto: FindTrainingApplyDto) {
    return this.trainingApplyService.findAllByAdmin(findTrainingApplyDto);
  }

  
  @ApiOperation({summary: 'Find One Training Apply By Teacher'})
  @ApiResponse({status: 200, type: TrainingApply})
  @UseGuards(TeacherGuard)
  @Get('find/:id/teacher')
  findOneByTeacher(@Param('id') id: string, @Req() req: Request) {
    return this.trainingApplyService.findOneByTeacher(id, req);
  }

  @ApiOperation({summary: 'Find One Training Apply By Admin'})
  @ApiResponse({status: 200, type: TrainingApply})
  @UseGuards(AdminGuard)
  @Get('find/:id/admin')
  findOneByAdmin(@Param('id') id: string) {
    return this.trainingApplyService.findOneByAdmin(id);
  }

  @ApiOperation({summary: 'Delete All Training Apply By Admin'})
  @ApiResponse({status: 200, type: TrainingApply})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.trainingApplyService.remove(id);
  }
}
