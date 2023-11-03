import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { TaskApplyService } from './task_apply.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskApply } from './entities/task_apply.entity';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CreateTaskApplyDto, FindTaskApplyDto, UpdateTaskApplyDto } from './dto';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('TASK_APPLY')
@Controller('task-apply')
export class TaskApplyController {
  constructor(private readonly taskApplyService: TaskApplyService) {}

  @ApiOperation({summary: 'CREATE TASK_APPLY'})
  @ApiResponse({status: 201, type: TaskApply})
  @UseGuards(TeacherGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  create(@Body() createTaskApplyDto: CreateTaskApplyDto, @Req() req: Request, @UploadedFile() image: any) {
    return this.taskApplyService.create(createTaskApplyDto, req, image);
  }

  @ApiOperation({summary: 'FIND ALL TASK_APPLY By Teacher'})
  @ApiResponse({status: 200, type: [TaskApply]})
  @UseGuards(TeacherGuard)
  @Post('find/teacher')
  findAllByTeacher(@Body() findTaskApplyDto: FindTaskApplyDto, @Req() req: Request) {
    return this.taskApplyService.findAllByTeacher(findTaskApplyDto, req);
  }

  @ApiOperation({summary: 'FIND ONE TASK_APPLY By Teacher'})
  @ApiResponse({status: 200, type: TaskApply})
  @UseGuards(TeacherGuard)
  @Get('find/:id/teacher')
  findOneByTeacher(@Param('id') id: string, @Req() req: Request) {
    return this.taskApplyService.findOneByTeacher(id, req);
  }

  @ApiOperation({summary: 'FIND ALL TASK_APPLY By Admin'})
  @ApiResponse({status: 200, type: [TaskApply]})
  @UseGuards(AdminGuard)
  @Post('find/admin')
  findAllByAdmin(@Body() findTaskApplyDto: FindTaskApplyDto) {
    return this.taskApplyService.findAllByAdmin(findTaskApplyDto);
  }

  @ApiOperation({summary: 'FIND ONE TASK_APPLY By Admin'})
  @ApiResponse({status: 200, type: TaskApply})
  @UseGuards(AdminGuard)
  @Get('find/:id/admin')
  findOneByAdmin(@Param('id') id: string) {
  return this.taskApplyService.findOneByAdmin(id);
  }

  @ApiOperation({summary: 'UPDATE ONE TASK_APPLY By Teacher'})
  @ApiResponse({status: 200, type: TaskApply})
  @UseGuards(TeacherGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTaskApplyDto: UpdateTaskApplyDto, @Req() req: Request, @UploadedFile() image: any) {
    return this.taskApplyService.update(id, updateTaskApplyDto, req, image);
  }

  @ApiOperation({summary: 'DELETE ONE TASK_APPLY By Admin'})
  @ApiResponse({status: 200, type: TaskApply})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.taskApplyService.remove(id);
  }
}
