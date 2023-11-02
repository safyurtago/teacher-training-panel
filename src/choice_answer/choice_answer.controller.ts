import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ChoiceAnswerService } from './choice_answer.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChoiceAnswer } from './entities/choice_answer.entity';
import { AdminGuard } from '../common/guards/admin.guard';
import { CreateChoiceAnswerDto, FindChoiceAnswerDto, UpdateChoiceAnswerDto } from './dto';

@ApiTags('CHOICE_ANSWER')
@Controller('choice-answer')
export class ChoiceAnswerController {
  constructor(private readonly choiceAnswerService: ChoiceAnswerService) {}

  @ApiOperation({summary: "CREATE CHOICE ANSWER"})
  @ApiResponse({status: 201, type: ChoiceAnswer})
  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() createChoiceAnswerDto: CreateChoiceAnswerDto) {
    return this.choiceAnswerService.create(createChoiceAnswerDto);
  }

  @ApiOperation({summary: "FIND ALL CHOICE ANSWER"})
  @ApiResponse({status: 200, type: [ChoiceAnswer]})
  @Post('find')
  findAll(@Body() findChoiceAnswerDto: FindChoiceAnswerDto) {
    return this.choiceAnswerService.findAll(findChoiceAnswerDto);
  }

  @ApiOperation({summary: "FIND CHOICE ANSWER"})
  @ApiResponse({status: 200, type: ChoiceAnswer})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.choiceAnswerService.findOne(id);
  }

  @ApiOperation({summary: "UPDATE CHOICE ANSWER"})
  @ApiResponse({status: 200, type: ChoiceAnswer})
  @UseGuards(AdminGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateChoiceAnswerDto: UpdateChoiceAnswerDto) {
    return this.choiceAnswerService.update(id, updateChoiceAnswerDto);
  }

  @ApiOperation({summary: "DELETE CHOICE ANSWER"})
  @ApiResponse({status: 200, type: ChoiceAnswer})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.choiceAnswerService.remove(id);
  }
}
