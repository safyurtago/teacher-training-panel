import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto, FindSchoolDto, UpdateSchoolDto } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { School } from './entities/school.entity';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOperation({summary: "CREATE SCHOOL BY ADMIN"})
  @ApiResponse({status: 201, type: School})
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.createSchool(createSchoolDto);
  }

  @ApiOperation({summary: "FIND ALL FILTERED SCHOOLS"})
  @ApiResponse({status: 200, type: [School]})
  @Post('find')
  findAll(@Body() findSchoolDto: FindSchoolDto) {
    return this.schoolService.findAllSchools(findSchoolDto);
  }

  @ApiOperation({summary: "FIND ONE SCHOOL BY ID"})
  @ApiResponse({status: 200, type: School})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOneSchool(id);
  }

  @ApiOperation({summary: "UPDATE ONE SCHOOL BY ID"})
  @ApiResponse({status: 200, type: School})
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.updateSchool(id, updateSchoolDto);
  }

  @ApiOperation({summary: "DELETE ONE SCHOOL BY ID"})
  @ApiResponse({status: 200, type: School})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolService.removeSchool(id);
  }
}
