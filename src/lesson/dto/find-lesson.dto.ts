import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class FindLessonDto {
  @ApiProperty({example: 'title 1', description: 'Lesson title'})
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({example: 'blablablablabla', description: 'Lesson description'})
  description?: string;
}
