import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateCheckTrainingApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Admin Unique ID'})
  @IsString()
  @IsNotEmpty()
  training_applyId: string;
  @ApiProperty({example: 'blablablabal', description: 'Checking Description'})
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({example: 100, description: 'Checking Apply Score'})
  @IsNumberString()
  @IsNotEmpty()
  score: number;
}
