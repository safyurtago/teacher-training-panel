import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateChoiceQuestionDto {
  @ApiProperty({example: "blablablabla", description: "Choice Question Text"})
  @IsString()
  @IsOptional()
  text?: string;
  @ApiProperty({example: "blablablabla", description: "Choice Question Description"})
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({example: "a", description: "Choice Question Description choice keys - [a, b, c, d]"})
  @IsString()
  @IsOptional()
  correct_choice?: string;
}
