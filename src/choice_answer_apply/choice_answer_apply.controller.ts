import { FindChoiceAnswerApplyDto } from './dto/find-choice_answer_apply.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ChoiceAnswerApplyService } from './choice_answer_apply.service';
import { CreateChoiceAnswerApplyDto } from './dto/create-choice_answer_apply.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChoiceAnswerApply } from './entities/choice_answer_apply.entity';
import { TeacherGuard } from '../common/guards/teacher.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { Request } from 'express';

@ApiTags('CHOICE_ANSWER_APPLY')
@Controller('choice-answer-apply')
export class ChoiceAnswerApplyController {
  constructor(private readonly choiceAnswerApplyService: ChoiceAnswerApplyService) {}

  @ApiOperation({summary: "Create Choice Answer Apply"})
  @ApiResponse({status: 201, type: ChoiceAnswerApply})
  @UseGuards(TeacherGuard)
  @Post('create')
  create(@Body() createChoiceAnswerApplyDto: CreateChoiceAnswerApplyDto, @Req() req: Request,) {
    return this.choiceAnswerApplyService.create(createChoiceAnswerApplyDto, req);
  }

  @ApiOperation({summary: "Find Filtered Choice Answer Apply By Teacher"})
  @ApiResponse({status: 201, type: [ChoiceAnswerApply]})
  @UseGuards(TeacherGuard)
  @Post('find/teacher')
  findAllByTeacher(@Body() findChoiceAnswerApplyDto: FindChoiceAnswerApplyDto, @Req() req: Request) {
    return this.choiceAnswerApplyService.findAllByTeacher(findChoiceAnswerApplyDto, req);
  }

  @ApiOperation({summary: "Find Filtered Answer Apply By Admin"})
  @ApiResponse({status: 201, type: [ChoiceAnswerApply]})
  @UseGuards(AdminGuard)
  @Post('find/admin')
  findAllByAdmin(@Body() findChoiceAnswerApplyDto: FindChoiceAnswerApplyDto) {
    return this.choiceAnswerApplyService.findAllByAdmin(findChoiceAnswerApplyDto);
  }

  @ApiOperation({summary: "Find One Choice Answer Apply By Teacher"})
  @ApiResponse({status: 201, type: ChoiceAnswerApply})
  @UseGuards(TeacherGuard)
  @Get('find/:id/teacher')
  findOneByTeacher(@Param('id') id: string, @Req() req: Request) {
    return this.choiceAnswerApplyService.findOneByTeacher(id, req);
  }

  @ApiOperation({summary: "Find One Choice Answer Apply By Admin"})
  @ApiResponse({status: 201, type: ChoiceAnswerApply})
  @UseGuards(AdminGuard)
  @Get('find/:id/admin')
  findOneByAdmin(@Param('id') id: string) {
    return this.choiceAnswerApplyService.findOneByAdmin(id);
  }

  @ApiOperation({summary: "Delete one Choice Answer Apply By Admin"})
  @ApiResponse({status: 201, type: ChoiceAnswerApply})
  @UseGuards(AdminGuard)
  @Delete('delete/:id/admin')
  remove(@Param('id') id: string) {
    return this.choiceAnswerApplyService.remove(id);
  }
}
