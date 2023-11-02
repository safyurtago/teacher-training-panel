import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WriteQuestionService } from './write_question.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWriteQuestionDto, FindWriteQuestionDto, UpdateWriteQuestionDto } from './dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { WriteQuestion } from './entities/write_question.entity';

@ApiTags('WRITE_QUESTION')
@Controller('write-question')
export class WriteQuestionController {
  constructor(private readonly writeQuestionService: WriteQuestionService) {}

  @ApiOperation({summary: 'Create Write Question'})
  @ApiResponse({status: 201, type: WriteQuestion})
  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() createWriteQuestionDto: CreateWriteQuestionDto) {
    return this.writeQuestionService.create(createWriteQuestionDto);
  }

  @ApiOperation({summary: 'Find All Filtered Write Question'})
  @ApiResponse({status: 200, type: [WriteQuestion]})
  @Post('find')
  findAll(@Body() findWriteQuestionDto: FindWriteQuestionDto) {
    return this.writeQuestionService.findAll(findWriteQuestionDto);
  }

  @ApiOperation({summary: 'Find One Write Question'})
  @ApiResponse({status: 200, type: WriteQuestion})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.writeQuestionService.findOne(id);
  }

  @ApiOperation({summary: 'Update One Write Question'})
  @ApiResponse({status: 200, type: WriteQuestion})
  @UseGuards(AdminGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateWriteQuestionDto: UpdateWriteQuestionDto) {
    return this.writeQuestionService.update(id, updateWriteQuestionDto);
  }

  @ApiOperation({summary: 'Delete One Write Question'})
  @ApiResponse({status: 200, type: WriteQuestion})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.writeQuestionService.remove(id);
  }
}
