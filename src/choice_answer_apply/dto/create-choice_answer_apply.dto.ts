import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateChoiceAnswerApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Choice Answer Unique ID'})
  @IsString()
  @IsNotEmpty()
  answerId: string;
  @ApiProperty({example: 'a', description: 'Key [a, b, c, d]'})
  @IsString()
  @IsNotEmpty()
  key: string;
}
