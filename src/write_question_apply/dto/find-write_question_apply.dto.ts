import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FindWriteQuestionApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Write Question Unique ID'})
  @IsString()
  @IsOptional()
  questionId?: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher Unique ID'})
  @IsString()
  @IsOptional()
  teacherId?: string;
  @ApiProperty({example: 'bla bla bla bla bla bla bla bla bla bla', description: 'Teacher Apply Answer'})
  @IsString()
  @IsOptional()
  value?: string;
  @ApiProperty({example: true, description: 'Answer Correct or Not Correct'})
  @IsBoolean()
  @IsOptional()
  is_correct?: boolean;
}
