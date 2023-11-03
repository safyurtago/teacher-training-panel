import { ApiProperty } from "@nestjs/swagger"

export class Task {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Admin Unique ID'})
  id: string
  @ApiProperty({example: 'title 1', description: 'Task title'})
  title: string
  @ApiProperty({example: 'description 1', description: 'Task description'})
  description: string
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.pdf/jpg', description: 'Task file'})
  file: string
  @ApiProperty({example: true, description: 'Task status'})
  is_active: boolean
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Lesson Unique Id'})
  lessonId: string
  @ApiProperty({example: 100, description: 'Task score'})
  score: number
}
