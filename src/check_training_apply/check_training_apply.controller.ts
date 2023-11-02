import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckTrainingApplyService } from './check_training_apply.service';
import { CreateCheckTrainingApplyDto } from './dto/create-check_training_apply.dto';
import { UpdateCheckTrainingApplyDto } from './dto/update-check_training_apply.dto';

@Controller('check-training-apply')
export class CheckTrainingApplyController {
  constructor(private readonly checkTrainingApplyService: CheckTrainingApplyService) {}

  @Post()
  create(@Body() createCheckTrainingApplyDto: CreateCheckTrainingApplyDto) {
    return this.checkTrainingApplyService.create(createCheckTrainingApplyDto);
  }

  @Get()
  findAll() {
    return this.checkTrainingApplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkTrainingApplyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckTrainingApplyDto: UpdateCheckTrainingApplyDto) {
    return this.checkTrainingApplyService.update(+id, updateCheckTrainingApplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkTrainingApplyService.remove(+id);
  }
}
