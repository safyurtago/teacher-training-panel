import { ApiProperty } from "@nestjs/swagger";

export class WriteQuestionApply {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Write Question Apply Unique ID'})
  id: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Write Question Unique ID'})
  questionId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher Unique ID'})
  teacherId: string;
  @ApiProperty({example: 'bla bla bla bla bla bla bla bla bla bla', description: 'Teacher Apply Answer'})
  value: string;
  @ApiProperty({example: true, description: 'Answer Correct or Not Correct'})
  is_correct: boolean;
}
