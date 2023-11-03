import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateLessonDto {
  @ApiProperty({example: 'title 1', description: 'Lesson title'})
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  @ApiProperty({example: 'blablablablabla', description: 'Lesson description'})
  description: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.pdf/jpg', description: 'Lesson File'})
  @IsOptional()
  file: any;
}
