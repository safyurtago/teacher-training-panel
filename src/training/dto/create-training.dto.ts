import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateTrainingDto {
  @ApiProperty({example: 'Training title', description: 'Training title'})
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({example: 'blablablabalb', description: 'Training description'})
  @IsString()
  @IsNotEmpty()
  description?: string;
  @ApiProperty({example: 'Math', description: 'Training subject'})
  @IsString()
  @IsNotEmpty()
  subject: string;
  @ApiProperty({example: 100, description: 'Training maximal score'})
  @IsNumberString()
  @IsNotEmpty()
  max_score: number;
  @ApiProperty({example: 50, description: 'Training pass score'})
  @IsNumberString()
  @IsNotEmpty()
  pass_score: number;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.jpg/pdf', description: 'file for training'})
  @IsString()
  @IsOptional()
  file: string;
}
