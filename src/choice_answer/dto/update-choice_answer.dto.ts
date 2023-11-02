import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateChoiceAnswerDto {
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Choice Question Unique Id"})
  @IsString()
  @IsOptional()
  questionId?: string;
  @ApiProperty({example: "a", description: "Correct answer [a, b, c, d]"})
  @IsString()
  @IsOptional()
  key?: string;
  @ApiProperty({example: "blablablablabla", description: "Answer text"})
  @IsString()
  @IsOptional()
  value?: string;
}
