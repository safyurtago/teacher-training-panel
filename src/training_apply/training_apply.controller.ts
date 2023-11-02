import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingApplyService } from './training_apply.service';
import { CreateTrainingApplyDto } from './dto/create-training_apply.dto';
import { UpdateTrainingApplyDto } from './dto/update-training_apply.dto';

@Controller('training-apply')
export class TrainingApplyController {
  constructor(private readonly trainingApplyService: TrainingApplyService) {}

  @Post()
  create(@Body() createTrainingApplyDto: CreateTrainingApplyDto) {
    return this.trainingApplyService.create(createTrainingApplyDto);
  }

  @Get()
  findAll() {
    return this.trainingApplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingApplyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingApplyDto: UpdateTrainingApplyDto) {
    return this.trainingApplyService.update(+id, updateTrainingApplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingApplyService.remove(+id);
  }
}
