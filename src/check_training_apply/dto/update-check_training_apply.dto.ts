import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdateCheckTrainingApplyDto {
  @ApiProperty({example: 'blablablabal', description: 'Checking Description'})
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({example: 100, description: 'Checking Apply Score'})
  @IsNumberString()
  @IsOptional()
  score?: number;
}
