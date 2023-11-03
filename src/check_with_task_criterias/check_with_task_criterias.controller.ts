import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CheckWithTaskCriteriasService } from './check_with_task_criterias.service';
import { CreateCheckWithTaskCriteriaDto, UpdateCheckWithTaskCriteriaDto, FindCheckWithTaskCriteriaDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckWithTaskCriteria } from './entities/check_with_task_criteria.entity';
import { AdminGuard } from '../common/guards/admin.guard';
import { Request } from 'express';
import { TeacherGuard } from '../common/guards/teacher.guard';

@ApiTags('CHECK_WITH_TASK_CRITERIA')
@Controller('check-with-task-criterias')
export class CheckWithTaskCriteriasController {
  constructor(private readonly checkWithTaskCriteriasService: CheckWithTaskCriteriasService) {}

  @ApiOperation({summary: 'Create new check-with-task-criterias'})
  @ApiResponse({status: 201, type: CheckWithTaskCriteria})
  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() createCheckWithTaskCriteriaDto: CreateCheckWithTaskCriteriaDto) {
    return this.checkWithTaskCriteriasService.create(createCheckWithTaskCriteriaDto);
  }

  @ApiOperation({summary: 'Find all check-with-task-criterias'})
  @ApiResponse({status: 200, type: [CheckWithTaskCriteria]})
  @UseGuards(TeacherGuard)
  @Post('find/teacher')
  findAllByTeacher(@Body() findCheckWithTaskCriteriaDto: FindCheckWithTaskCriteriaDto, @Req() req: Request) {
    return this.checkWithTaskCriteriasService.findAllByTeacher(findCheckWithTaskCriteriaDto, req);
  }

  @ApiOperation({summary: 'Find one check-with-task-criterias'})
  @ApiResponse({status: 200, type: CheckWithTaskCriteria})
  @UseGuards(TeacherGuard)
  @Get('find/:id/teacher')
  findOneByTeacher(@Param('id') id: string, @Req() req: Request) {
    return this.checkWithTaskCriteriasService.findOneByTeacher(id, req);
  }

  @ApiOperation({summary: 'Find all check-with-task-criterias'})
  @ApiResponse({status: 200, type: [CheckWithTaskCriteria]})
  @UseGuards(AdminGuard)
  @Post('find/admin')
  findAllByAdmin(@Body() findCheckWithTaskCriteriaDto: FindCheckWithTaskCriteriaDto) {
    return this.checkWithTaskCriteriasService.findAllByAdmin(findCheckWithTaskCriteriaDto);
  }

  @ApiOperation({summary: 'Find one check-with-task-criterias'})
  @ApiResponse({status: 200, type: CheckWithTaskCriteria})
  @UseGuards(AdminGuard)
  @Get('find/:id/adimn')
  findOneByAdmin(@Param('id') id: string) {
    return this.checkWithTaskCriteriasService.findOneByAdmin(id);
  }

  @ApiOperation({summary: 'Update check-with-task-criterias'})
  @ApiResponse({status: 200, type: CheckWithTaskCriteria})
  @UseGuards(AdminGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCheckWithTaskCriteriaDto: UpdateCheckWithTaskCriteriaDto) {
    return this.checkWithTaskCriteriasService.update(id, updateCheckWithTaskCriteriaDto);
  }

  @ApiOperation({summary: 'Delete check-with-task-criterias'})
  @ApiResponse({status: 200, type: CheckWithTaskCriteria})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.checkWithTaskCriteriasService.remove(id);
  }
}
