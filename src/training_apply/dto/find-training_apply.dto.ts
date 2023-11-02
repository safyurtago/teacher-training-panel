import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindTrainingApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Training Unique ID'})
  @IsString()
  @IsOptional()
  trainingId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher Unique ID'})
  @IsString()
  @IsOptional()
  teacherId: string;
  @ApiProperty({example: 'blablablablablabla', description: 'Training Apply Text'})
  @IsString()
  @IsOptional()
  text: string;
}
