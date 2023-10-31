import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeacherWorkplaceService } from './teacher_workplace.service';
import { CreateTeacherWorkplaceDto } from './dto/create-teacher_workplace.dto';
import { UpdateTeacherWorkplaceDto } from './dto/update-teacher_workplace.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeacherWorkplace } from './entities/teacher_workplace.entity';
import { TeacherGuard } from '../common/guards/teacher.guard';

@Controller('teacher-workplace')
export class TeacherWorkplaceController {
  constructor(private readonly teacherWorkplaceService: TeacherWorkplaceService) {}

  @ApiOperation({summary: 'CREATE WORKPLACE BY TEACHER'})
  @ApiResponse({status: 201, type: TeacherWorkplace})
  @UseGuards(TeacherGuard)
  @Post()
  createTeacherWorkplace(@Body() createTeacherWorkplaceDto: CreateTeacherWorkplaceDto) {
    return this.teacherWorkplaceService.createTeacherWorkplace(createTeacherWorkplaceDto);
  }

  @ApiOperation({summary: 'FIND WORKPLACES'})
  @ApiResponse({status: 200, type: [TeacherWorkplace]})
  @Get()
  findAll() {
    return this.teacherWorkplaceService.findAll();
  }

  @ApiOperation({summary: 'FIND ONE WORKPLACE BY ID'})
  @ApiResponse({status: 200, type: TeacherWorkplace})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherWorkplaceService.findOne(+id);
  }

  @ApiOperation({summary: 'UPDATE ONE WORKPLACE BY ID'})
  @ApiResponse({status: 200, type: TeacherWorkplace})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherWorkplaceDto: UpdateTeacherWorkplaceDto) {
    return this.teacherWorkplaceService.update(+id, updateTeacherWorkplaceDto);
  }

  @ApiOperation({summary: 'DELETE ONE WORKPLACE BY ID'})
  @ApiResponse({status: 200, type: TeacherWorkplace})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherWorkplaceService.remove(+id);
  }
}
