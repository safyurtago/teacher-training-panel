import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskCriterionDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Key'})
  @IsString()
  @IsOptional()
  key?: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Value'})
  @IsNumber()
  @IsOptional()
  value?: number;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Description'})
  @IsString()
  @IsOptional()
  description?: string;
}
