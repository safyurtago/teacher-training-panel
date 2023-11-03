import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLessonDto {
  @ApiProperty({example: 'title 1', description: 'Lesson title'})
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'blablablablabla', description: 'Lesson description'})
  description: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.pdf/jpg', description: 'Lesson File'})
  @IsOptional()
  file?: any;
}
