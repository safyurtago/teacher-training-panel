import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateWriteQuestionDto {
  @ApiProperty({example: 'blablablablablablablabla', description: 'Write Question Text'})
  @IsString()
  @IsOptional()
  text?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({example: 'blablablablablablablbalb', description: 'Write Question Correct Answer'})
  correct_answer?: string;
}
