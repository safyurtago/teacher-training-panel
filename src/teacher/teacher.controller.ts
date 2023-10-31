import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, UseGuards, Req, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Teacher } from './entities/teacher.entity';
import { ChangePasswordDto, CreateTeacherDto, LoginTeacherDto, UpdateTeacherDto } from './dto';
import { Request, Response } from 'express';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import { FindFilteredTeachersDto } from './dto/find-filter-teachers.dto';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('TEACHER')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({summary: 'SIGN UP Teacher'})
  @ApiResponse({status: 201, type: Teacher})
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp (
    @Body() createTeacherDto: CreateTeacherDto, @Res({passthrough: true}) res: Response,
  ) {
    return this.teacherService.signUp(createTeacherDto, res);
  }

  @ApiOperation({summary: 'ACTIVATE Teacher'})
  @ApiResponse({status: 200, type: [Teacher]})
  @Get('activate/:link')
  activate (@Param('link') link: string) {
      return this.teacherService.activate(link)
  }

  @ApiOperation({summary: 'Login Teacher'})
  @ApiResponse({status: 200, type: [Teacher]})
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn (
    @Body() loginTeacherDto: LoginTeacherDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.teacherService.signIn(loginTeacherDto, res);
  }

  @ApiOperation({summary: 'Logout Teacher'})
  @ApiResponse({status: 200, type: [Teacher]})
  @UseGuards(TeacherGuard)
  @Post('signout')
  signOut (
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ) {
    return this.teacherService.signOut(refreshToken, res);
  }

  @ApiOperation({summary: 'FIND ALL FILTERD TeacherS'})
  @ApiResponse({status: 200, type: [Teacher]})
  @UseGuards(AdminGuard)
  @Post('find')
  findAll(@Body() findFilteredTeachersDto: FindFilteredTeachersDto) {
    return this.teacherService.findFilteredTeachers(findFilteredTeachersDto);
  }


  @ApiOperation({summary: 'Refresh Token'})
  @ApiResponse({status: 200, description: 'Refresh Tokens'})
  @UseGuards(TeacherGuard)
  @Post(':id/refresh')
  refreshToken(
    @Param('id') id: string, @CookieGetter('refresh_token') refreshToken: string, 
    @Res({passthrough: true}) res: Response
  ) {
    return this.teacherService.refreshToken(id, refreshToken, res)
  }

  @ApiOperation({summary: 'FIND TEACHER BY ID'})
  @ApiResponse({status: 200, type: Teacher})
  @UseGuards(TeacherGuard)
  @Get('findone/:id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.teacherService.findOneTeacher(id, req);
  }

  @ApiOperation({summary: 'FIND TEACHER BY ID BY ADMIN'})
  @ApiResponse({status: 200, type: Teacher})
  @UseGuards(AdminGuard)
  @Get('findone/:id/admin')
  findOneTeacherByAdmin (
    @Param('id') id: string,
  ) {
    return this.teacherService.findOneTeacherByAdmin(id);
  }


  @ApiOperation({summary: 'UPDATE TEACHER BY ID'})
  @ApiResponse({status: 200, type: Teacher})
  @UseGuards(TeacherGuard)
  @Put('update/:id')
  updateTeacher(
    @Param('id') id: string, 
    @Body() updateTeacherDto: UpdateTeacherDto,
    @Req() req: Request,
    ) {
    return this.teacherService.updateTeacher(id, updateTeacherDto, req);
  }

  @ApiOperation({summary: 'Delete TEACHER BY ID'})
  @ApiResponse({status: 200, description: "True if Deleted!"})
  @UseGuards(TeacherGuard)
  @Delete('delete/:id')
  deleteTeacher(
    @Param('id') id: string, 
    @Req() req: Request,
    ) {
    return this.teacherService.deleteTeacher(id, req);
  }

  @ApiOperation({summary: 'CHANGE PASSWORD TEACHER '})
  @ApiResponse({status: 200, description: "True if UPDATED!"})
  @UseGuards(TeacherGuard)
  @Patch('change-password')
  changePassword (
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
    ) {
    return this.teacherService.changePassword(changePasswordDto, req);
  }
}
