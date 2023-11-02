import { ApiProperty } from "@nestjs/swagger";

export class ChoiceAnswerApply {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Choice Answer Apply Unique ID'})
  id: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Techer Unique ID'})
  teacherId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Choice Answer Unique ID'})
  answerId: string;
  @ApiProperty({example: 'a', description: 'Key [a, b, c, d]'})
  key: string;
  @ApiProperty({example: true, description: 'Apply Correct or Not Correct'})
  is_correct: boolean;
}
