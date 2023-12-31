import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTrainingDto {
  @ApiProperty({example: 'Training title', description: 'Training title'})
  @IsString()
  @IsOptional()
  title?: string;
  @ApiProperty({example: 'blablablabalb', description: 'Training description'})
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({example: 'Math', description: 'Training subject'})
  @IsString()
  @IsOptional()
  subject?: string;
  @ApiProperty({example: 100, description: 'Training maximal score'})
  @IsNumber()
  @IsOptional()
  max_score?: number;
  @ApiProperty({example: 50, description: 'Training pass score'})
  @IsNumber()
  @IsOptional()
  pass_score?: number;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.jpg/pdf', description: 'file for training'})
  @IsString()
  @IsOptional()
  file?: string;
}
