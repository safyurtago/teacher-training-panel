import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { AdminGuard } from '../common/guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTaskDto, FindTaskDto, UpdateTaskDto } from './dto';

@ApiTags('TASK')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({summary: 'Create Task'})
  @ApiResponse({status: 201, type: Task})
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto, @UploadedFile() image: any) {
    return this.taskService.create(createTaskDto, image);
  }

  @ApiOperation({summary: 'Find All Task'})
  @ApiResponse({status: 200, type: Task})
  @Post('find')
  findAll(@Body() findTaskDto: FindTaskDto) {
    return this.taskService.findAll(findTaskDto);
  }

  @ApiOperation({summary: 'Find One Task'})
  @ApiResponse({status: 200, type: Task})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @ApiOperation({summary: 'Update One Task'})
  @ApiResponse({status: 200, type: Task})
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @UploadedFile() image: any) {
    return this.taskService.update(id, updateTaskDto, image);
  }

  @ApiOperation({summary: 'Delete One Task'})
  @ApiResponse({status: 200, type: Task})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
