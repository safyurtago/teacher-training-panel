import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Lesson } from './entities/lesson.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateLessonDto, FindLessonDto, UpdateLessonDto } from './dto';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('LESSON')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperation({summary: 'Create a new lesson'})
  @ApiResponse({status: 201, type: Lesson})
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() createLessonDto: CreateLessonDto, @UploadedFile() image: any) {
    return this.lessonService.create(createLessonDto, image);
  }

  @ApiOperation({summary: 'Find All Filtered lesson'})
  @ApiResponse({status: 200, type: [Lesson]})
  @Post('find')
  findAll(@Body() findLessonDto: FindLessonDto) {
    return this.lessonService.findAll(findLessonDto);
  }

  @ApiOperation({summary: 'Find One lesson'})
  @ApiResponse({status: 200, type: Lesson})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @ApiOperation({summary: 'Update One lesson'})
  @ApiResponse({status: 200, type: Lesson})
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto, @UploadedFile() image: any) {
    return this.lessonService.update(id, updateLessonDto, image);
  }

  @ApiOperation({summary: 'Delete One lesson'})
  @ApiResponse({status: 200, type: Lesson})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
