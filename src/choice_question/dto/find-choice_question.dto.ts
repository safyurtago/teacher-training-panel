import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class FindChoiceQuestionDto {
  @ApiProperty({example: "blablablabla", description: "Choice Question Text"})
  @IsString()
  @IsOptional()
  text?: string;
  @ApiProperty({example: "blablablabla", description: "Choice Question Description"})
  @IsString()
  @IsOptional()
  description?: string;
}
