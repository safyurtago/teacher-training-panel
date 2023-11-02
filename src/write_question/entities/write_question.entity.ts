import { ApiProperty } from "@nestjs/swagger";

export class WriteQuestion {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Write Question Unique ID'})
  id: string;
  @ApiProperty({example: 'blablablablablablablabla', description: 'Write Question Text'})
  text: string;
  @ApiProperty({example: 'blablablablablablablbalb', description: 'Write Question Correct Answer'})
  correct_answer: string;
  @ApiProperty({example: true, description: 'Write Question Status'})
  is_active: boolean;
}
