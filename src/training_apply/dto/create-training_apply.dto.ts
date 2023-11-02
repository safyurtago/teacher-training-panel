import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTrainingApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Training Unique ID'})
  @IsString()
  @IsNotEmpty()
  trainingId: string;
  @ApiProperty({example: 'blablablablablabla', description: 'Training Apply Text'})
  @IsString()
  @IsNotEmpty()
  text: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Training Apply File'})
  @IsString()
  @IsOptional()
  file?: string;
}
