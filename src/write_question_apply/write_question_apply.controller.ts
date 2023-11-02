import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WriteQuestionApplyService } from './write_question_apply.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWriteQuestionApplyDto, FindWriteQuestionApplyDto } from './dto';
import { WriteQuestionApply } from './entities/write_question_apply.entity';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { Request } from 'express';


@ApiTags('WRITE_QUESTION_APPLY')
@Controller('write-question-apply')
export class WriteQuestionApplyController {
  constructor(private readonly writeQuestionApplyService: WriteQuestionApplyService) {}

  @ApiOperation({summary: 'CREATE Write Question Apply'})
  @ApiResponse({status: 201, type: WriteQuestionApply})
  @UseGuards(TeacherGuard)
  @Post('create')
  create(@Body() createWriteQuestionApplyDto: CreateWriteQuestionApplyDto, @Req() req: Request) {
    return this.writeQuestionApplyService.create(createWriteQuestionApplyDto, req);
  }

  @ApiOperation({summary: 'FIND ALL Write Question Apply By ADMIN'})
  @ApiResponse({status: 200, type: [WriteQuestionApply]})
  @UseGuards(AdminGuard)
  @Post('find/admin')
  findAllByAdmin(@Body() findWriteQuestionApplyDto: FindWriteQuestionApplyDto) {
    return this.writeQuestionApplyService.findAllByAdmin(findWriteQuestionApplyDto);
  }

  @ApiOperation({summary: 'FIND ALL Write Question Apply By TEACHER'})
  @ApiResponse({status: 200, type: [WriteQuestionApply]})
  @UseGuards(TeacherGuard)
  @Post('find/teacher')
  findAllByTeacher(@Body() findWriteQuestionApplyDto: FindWriteQuestionApplyDto, @Req() req: Request) {
    return this.writeQuestionApplyService.findAllByTeacher(findWriteQuestionApplyDto, req);
  }

  @ApiOperation({summary: 'FIND ONE Write Question Apply By ADMIN'})
  @ApiResponse({status: 200, type: [WriteQuestionApply]})
  @UseGuards(AdminGuard)
  @Get('find/:id/admin')
  findOneByAdmin(@Param('id') id: string) {
    return this.writeQuestionApplyService.findOneByAdmin(id);
  }

  @ApiOperation({summary: 'FIND ONE Write Question Apply By TEACHER'})
  @ApiResponse({status: 200, type: [WriteQuestionApply]})
  @UseGuards(TeacherGuard)
  @Get('find/:id/teacher')
  findOneByTeacher(@Param('id') id: string, @Req() req: Request) {
    return this.writeQuestionApplyService.findOneByTeacher(id, req);
  }

  @ApiOperation({summary: 'DELETE ONE Write Question Apply By ADMIN'})
  @ApiResponse({status: 200, type: [WriteQuestionApply]})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.writeQuestionApplyService.remove(id);
  }
}
