import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskCriteriaService } from './task_criteria.service';
import { CreateTaskCriterionDto, FindTaskCriterionDto, UpdateTaskCriterionDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskCriterion } from './entities/task_criterion.entity';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('TASK_CRITERIA')
@Controller('task-criteria')
export class TaskCriteriaController {
  constructor(private readonly taskCriteriaService: TaskCriteriaService) {}

  @ApiOperation({summary: "Create a new task criterion"})
  @ApiResponse({status: 201, type: TaskCriterion})
  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() createTaskCriterionDto: CreateTaskCriterionDto) {
    return this.taskCriteriaService.create(createTaskCriterionDto);
  }

  @ApiOperation({summary: "Find all criterion"})
  @ApiResponse({status: 200, type: [TaskCriterion]})
  @Post('find')
  findAll(@Body() findTaskCriterionDto: FindTaskCriterionDto) {
    return this.taskCriteriaService.findAll(findTaskCriterionDto);
  }

  @ApiOperation({summary: "Find a criterion"})
  @ApiResponse({status: 200, type: TaskCriterion})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.taskCriteriaService.findOne(id);
  }

  @ApiOperation({summary: "Update a criterion"})
  @ApiResponse({status: 200, type: TaskCriterion})
  @UseGuards(AdminGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTaskCriterionDto: UpdateTaskCriterionDto) {
    return this.taskCriteriaService.update(id, updateTaskCriterionDto);
  }

  @ApiOperation({summary: "Delete a criterion"})
  @ApiResponse({status: 200, type: TaskCriterion})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.taskCriteriaService.remove(id);
  }
}
