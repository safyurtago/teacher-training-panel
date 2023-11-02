import { ApiProperty } from "@nestjs/swagger";

export class CheckTrainingApply {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Admin Unique ID'})
  id: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Admin Unique ID'})
  training_applyId: string;
  @ApiProperty({example: 'blablablabal', description: 'Checking Description'})
  description: string;
  @ApiProperty({example: 100, description: 'Checking Apply Score'})
  score: number;
  @ApiProperty({example: true, description: 'Checking Status'})
  is_active: boolean;
  @ApiProperty({example: true, description: 'Checking Is Seen?'})
  is_seen: boolean;
}
