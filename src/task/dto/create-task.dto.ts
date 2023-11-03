import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

export class CreateTaskDto {
  @ApiProperty({example: 'title 1', description: 'Task title'})
  @IsString()
  @IsNotEmpty()
  title: string
  @ApiProperty({example: 'description 1', description: 'Task description'})
  @IsString()
  @IsNotEmpty()
  description: string
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.pdf/jpg', description: 'Task file'})
  @IsString()
  @IsOptional()
  file?: string
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Lesson Unique Id'})
  @IsString()
  @IsNotEmpty()
  lessonId: string
  @ApiProperty({example: 100, description: 'Task score'})
  @IsNumber()
  @IsNotEmpty()
  score: number
}
