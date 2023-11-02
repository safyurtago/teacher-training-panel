import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FindChoiceAnswerApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Choice Answer Unique ID'})
  @IsString()
  @IsOptional()
  answerId?: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher Unique ID'})
  @IsString()
  @IsOptional()
  teacherId?: string;
  @ApiProperty({example: 'a', description: 'Key [a, b, c, d]'})
  @IsString()
  @IsOptional()
  key?: string;
  @ApiProperty({example: true, description: 'Correct One Or Not'})
  @IsBoolean()
  @IsOptional()
  is_correct?: boolean;
}
