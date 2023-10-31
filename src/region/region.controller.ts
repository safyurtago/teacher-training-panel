import { FindRegionDto } from './dto/find-region.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from './entities/region.entity';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('REGION')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({summary: 'CREATE REGION ADMIN'})
  @ApiResponse({status: 201, type: Region})
  @UseGuards(AdminGuard)
  @Post()
  createRegion(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.createRegion(createRegionDto);
  }

  @ApiOperation({summary: 'FIND ALL FILTERED REGIONS '})
  @ApiResponse({status: 200, type: [Region]})
  @Post('find')
  findAll(
    findRegionDto: FindRegionDto,
  ) {
    return this.regionService.findAll(FindRegionDto);
  }

  @ApiOperation({summary: 'FIND ONE REGION BY ID'})
  @ApiResponse({status: 200, type: Region})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @ApiOperation({summary: 'UPDATE ONE REGION BY ID'})
  @ApiResponse({status: 200, type: Region})
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(id, updateRegionDto);
  }

  @ApiOperation({summary: 'DELETE ONE REGION BY ID'})
  @ApiResponse({status: 200, type: Region})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}
