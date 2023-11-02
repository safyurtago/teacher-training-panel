import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWriteQuestionApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Write Question Unique ID'})
  @IsString()
  @IsNotEmpty()
  questionId: string;
  @ApiProperty({example: 'bla bla bla bla bla bla bla bla bla bla', description: 'Teacher Apply Answer'})
  @IsString()
  @IsNotEmpty()
  value: string;
}
