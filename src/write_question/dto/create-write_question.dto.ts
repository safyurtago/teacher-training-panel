import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWriteQuestionDto {
  @ApiProperty({example: 'blablablablablablablabla', description: 'Write Question Text'})
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'blablablablablablablbalb', description: 'Write Question Correct Answer'})
  correct_answer: string;
}
