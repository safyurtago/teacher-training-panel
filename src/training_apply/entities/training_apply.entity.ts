import { ApiProperty } from "@nestjs/swagger";

export class TrainingApply {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Training Apply Unique ID'})
  id: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Training Unique ID'})
  trainingId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher Unique ID'})
  teacherId: string;
  @ApiProperty({example: 'blablablablablabla', description: 'Training Apply Text'})
  text: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Training Apply File'})
  file: string;
  @ApiProperty({example: true, description: 'Training Apply Status'})
  is_seen: boolean;
}
