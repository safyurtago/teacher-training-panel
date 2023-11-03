import { ApiProperty } from "@nestjs/swagger";

export class Lesson {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Lesson Unique Id'})
  id: string;
  @ApiProperty({example: 'title 1', description: 'Lesson title'})
  title: string;
  @ApiProperty({example: 'blablablablabla', description: 'Lesson description'})
  description: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.pdf/jpg', description: 'Lesson File'})
  file: string;
  @ApiProperty({example: true, description: 'Lesson Status'})
  is_active: boolean;
}
