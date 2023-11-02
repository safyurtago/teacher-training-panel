import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TeacherWorkplaceService } from './teacher_workplace.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeacherWorkplace } from './entities/teacher_workplace.entity';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { CreateTeacherWorkplaceDto, FindTeacherWorkplaceDto, UpdateTeacherWorkplaceDto } from './dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { Request } from 'express';

@ApiTags('TEACHER_WORKPLACE')
@Controller('teacher-workplace')
export class TeacherWorkplaceController {
  constructor(private readonly teacherWorkplaceService: TeacherWorkplaceService) {}

  @ApiOperation({summary: 'CREATE WORKPLACE BY TEACHER'})
  @ApiResponse({status: 201, type: TeacherWorkplace})
  @UseGuards(TeacherGuard)
  @Post('create')
  createTeacherWorkplace(@Body() createTeacherWorkplaceDto: CreateTeacherWorkplaceDto) {
    return this.teacherWorkplaceService.createTeacherWorkplace(createTeacherWorkplaceDto);
  }

  @ApiOperation({summary: 'FIND WORKPLACES BY TEACHER'})
  @ApiResponse({status: 200, type: [TeacherWorkplace]})
  @UseGuards(AdminGuard)
  @Post('find')
  findAllWorkplaces(
    @Body() findTeacherWorkplaceDto: FindTeacherWorkplaceDto,
  ) {
    return this.teacherWorkplaceService.findAllWorkplaces(findTeacherWorkplaceDto);
  }

  @ApiOperation({summary: 'FIND ONE WORKPLACE BY ID'})
  @ApiResponse({status: 200, type: TeacherWorkplace})
  @UseGuards(TeacherGuard)
  @Get(':id/teacher')
  findOneByTeacher(@Param('id') id: string, @Req() req: Request) {
    return this.teacherWorkplaceService.findOneByTeacher(id, req);
  }

  @ApiOperation({summary: 'FIND ONE WORKPLACE BY ID'})
  @ApiResponse({status: 200, type: TeacherWorkplace})
  @UseGuards(AdminGuard)
  @Get(':id/admin')
  findOneByAdmin(@Param('id') id: string) {
    return this.teacherWorkplaceService.findOneByAdmin(id);
  }

  @ApiOperation({summary: 'UPDATE ONE WORKPLACE BY ID'})
  @ApiResponse({status: 200, type: TeacherWorkplace})
  @UseGuards(TeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherWorkplaceDto: UpdateTeacherWorkplaceDto,
    @Req() req: Request,
  ) {
    return this.teacherWorkplaceService.update(id, updateTeacherWorkplaceDto, req);
  }

  @ApiOperation({summary: 'DELETE ONE WORKPLACE BY ID'})
  @ApiResponse({status: 200, type: TeacherWorkplace})
  @UseGuards(TeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.teacherWorkplaceService.remove(id, req);
  }
}
