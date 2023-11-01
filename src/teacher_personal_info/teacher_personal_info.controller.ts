import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TeacherPersonalInfoService } from './teacher_personal_info.service';
import { Request } from 'express';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTeacherPersonalInfoDto, FindTeacherPersonalInfoDto, UpdateTeacherPersonalInfoDto } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeacherPersonalInfo } from './entities/teacher_personal_info.entity';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('teacher-personal-info')
export class TeacherPersonalInfoController {
  constructor(private readonly teacherPersonalInfoService: TeacherPersonalInfoService) {}

  @ApiOperation({summary: "CREATE TeacherPersonalInfos BY TEACHER"})
  @ApiResponse({status: 201, type: TeacherPersonalInfo})
  @UseGuards(TeacherGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createTeacherPersonalInfo(
    @Body() createTeacherPersonalInfoDto: CreateTeacherPersonalInfoDto,
    @Req() req: Request,
    @UploadedFile() image: any,
    ) {
    return this.teacherPersonalInfoService.createTeacherPersonalInfo(createTeacherPersonalInfoDto, req, image);
  }


  @ApiOperation({summary: "CREATE TeacherPersonalInfos BY TEACHER"})
  @ApiResponse({status: 200, type: [TeacherPersonalInfo]})
  @UseGuards(AdminGuard)
  @Post('find')
  findAllTeacherPersonalInfos(@Body() findTeacherPersonalInfoDto: FindTeacherPersonalInfoDto) {
    return this.teacherPersonalInfoService.findAllTeacherPersonalInfos(findTeacherPersonalInfoDto);
  }

  @ApiOperation({summary: "CREATE TeacherPersonalInfos BY TEACHER"})
  @ApiResponse({status: 200, type: TeacherPersonalInfo})
  @UseGuards(TeacherGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.teacherPersonalInfoService.findOne(id, req);
  }

  @ApiOperation({summary: "CREATE TeacherPersonalInfos BY ADMIN"})
  @ApiResponse({status: 200, type: TeacherPersonalInfo})
  @UseGuards(AdminGuard)
  @Get('find/:id/admin')
  findOneByAdmin(@Param('id') id: string) {
    return this.teacherPersonalInfoService.findOneByAdmin(id);
  }

  @ApiOperation({summary: "CREATE TeacherPersonalInfos BY TEACHER"})
  @ApiResponse({status: 200, type: TeacherPersonalInfo})
  @UseGuards(TeacherGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTeacherPersonalInfoDto: UpdateTeacherPersonalInfoDto, @Req() req: Request) {
    return this.teacherPersonalInfoService.update(id, updateTeacherPersonalInfoDto, req);
  }

  @ApiOperation({summary: "CREATE TeacherPersonalInfos BY TEACHER"})
  @ApiResponse({status: 200, type: TeacherPersonalInfo})
  @UseGuards(TeacherGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.teacherPersonalInfoService.remove(id, req);
  }
}
