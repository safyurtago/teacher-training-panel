import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

export class FindTaskDto {
  @ApiProperty({example: 'title 1', description: 'Task title'})
  @IsString()
  @IsOptional()
  title: string
  @ApiProperty({example: 'description 1', description: 'Task description'})
  @IsString()
  @IsOptional()
  description: string
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Lesson Unique Id'})
  @IsString()
  @IsOptional()
  lessonId: string
  @ApiProperty({example: 100, description: 'Task score'})
  @IsNumber()
  @IsOptional()
  score: number;
}
