import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

export class FindCheckTrainingApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Admin Unique ID'})
  @IsString()
  @IsOptional()
  training_applyId?: string;
  @ApiProperty({example: 'blablablabal', description: 'Checking Description'})
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({example: 100, description: 'Checking Apply Score'})
  @IsNumberString()
  @IsOptional()
  score?: number;
}
