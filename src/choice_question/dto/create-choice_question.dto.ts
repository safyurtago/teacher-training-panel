import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChoiceQuestionDto {
  @ApiProperty({example: "blablablabla", description: "Choice Question Text"})
  @IsString()
  @IsNotEmpty()
  text: string;
  @ApiProperty({example: "blablablabla", description: "Choice Question Description"})
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty({example: "a", description: "Choice Question Description choice keys - [a, b, c, d]"})
  @IsString()
  @IsNotEmpty()
  correct_choice: string;
}

