import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChoiceQuestionService } from './choice_question.service';
import { CreateChoiceQuestionDto, FindChoiceQuestionDto, UpdateChoiceQuestionDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChoiceQuestion } from './entities/choice_question.entity';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('CHOICE_QUESTION')
@Controller('choice-question')
export class ChoiceQuestionController {
  constructor(private readonly choiceQuestionService: ChoiceQuestionService) {}

  @ApiOperation({summary: 'Create Choice Question'})
  @ApiResponse({status: 201, type: ChoiceQuestion})
  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() createChoiceQuestionDto: CreateChoiceQuestionDto) {
    return this.choiceQuestionService.create(createChoiceQuestionDto);
  }

  @ApiOperation({summary: 'Find All Filtered Choice Questions'})
  @ApiResponse({status: 200, type: [ChoiceQuestion]})
  @Post('find')
  findAll(@Body() findChoiceQuestionDt: FindChoiceQuestionDto) {
    return this.choiceQuestionService.findAll(findChoiceQuestionDt);
  }

  @ApiOperation({summary: 'Find One Choice Question'})
  @ApiResponse({status: 200, type: ChoiceQuestion})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.choiceQuestionService.findOne(id);
  }

  @ApiOperation({summary: 'Update One Choice Question'})
  @ApiResponse({status: 200, type: ChoiceQuestion})
  @UseGuards(AdminGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateChoiceQuestionDto: UpdateChoiceQuestionDto) {
    return this.choiceQuestionService.update(id, updateChoiceQuestionDto);
  }

  @ApiOperation({summary: 'Delete One Choice Question'})
  @ApiResponse({status: 200, type: ChoiceQuestion})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.choiceQuestionService.remove(id);
  }
}
