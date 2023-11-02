import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CheckTrainingApplyService } from './check_training_apply.service';
import { CreateCheckTrainingApplyDto, FindCheckTrainingApplyDto, UpdateCheckTrainingApplyDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckTrainingApply } from './entities/check_training_apply.entity';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('CHECK_TRAINING_APPLY')
@Controller('check-training-apply')
export class CheckTrainingApplyController {
  constructor(private readonly checkTrainingApplyService: CheckTrainingApplyService) {}


  @ApiOperation({summary: 'Create Check training apply'})
  @ApiResponse({status: 201, type: CheckTrainingApply})
  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() createCheckTrainingApplyDto: CreateCheckTrainingApplyDto) {
    return this.checkTrainingApplyService.create(createCheckTrainingApplyDto);
  }

  @ApiOperation({summary: 'Find All Check training apply'})
  @ApiResponse({status: 200, type: [CheckTrainingApply]})
  @Post('find')
  findAll(@Body() findCheckTrainingApplyDto: FindCheckTrainingApplyDto) {
    return this.checkTrainingApplyService.findAll(findCheckTrainingApplyDto);
  }

  @ApiOperation({summary: 'Find One Check training apply'})
  @ApiResponse({status: 201, type: CheckTrainingApply})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.checkTrainingApplyService.findOne(id);
  }

  @ApiOperation({summary: 'Update Check training apply'})
  @ApiResponse({status: 200, type: CheckTrainingApply})
  @UseGuards(AdminGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCheckTrainingApplyDto: UpdateCheckTrainingApplyDto) {
    return this.checkTrainingApplyService.update(id, updateCheckTrainingApplyDto);
  }

  @ApiOperation({summary: 'Delete Check training apply'})
  @ApiResponse({status: 200, type: CheckTrainingApply})
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.checkTrainingApplyService.remove(id);
  }
}
