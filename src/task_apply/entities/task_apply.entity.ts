import { ApiProperty } from "@nestjs/swagger";

export class TaskApply {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Apply Unique ID'})
  id: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Apply Unique ID'})
  teacherId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Apply Unique ID'})
  taskId: string;
  @ApiProperty({example: 78, description: 'Task Apply socre 78/100'})
  overal_score: number;
  @ApiProperty({example: 'smth about task', description: 'Task Apply Description'})
  description: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.pdf', description: 'Task Apply File '})
  file: string;
  @ApiProperty({example: true, description: 'Task Apply Status'})
  is_active: boolean;
  @ApiProperty({example: false, description: 'Task Apply Is Seen or Not?'})
  is_seen: boolean;
}
