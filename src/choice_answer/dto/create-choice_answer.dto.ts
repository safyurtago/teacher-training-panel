import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChoiceAnswerDto {
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Choice Question Unique Id"})
  @IsString()
  @IsNotEmpty()
  questionId: string;
  @ApiProperty({example: "a", description: "Correct answer [a, b, c, d]"})
  @IsString()
  @IsNotEmpty()
  key: string;
  @ApiProperty({example: "blablablablabla", description: "Answer text"})
  @IsString()
  @IsNotEmpty()
  value: string;
}
