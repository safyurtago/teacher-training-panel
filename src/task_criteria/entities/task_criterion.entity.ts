import { ApiProperty } from "@nestjs/swagger";

export class TaskCriterion {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Unique ID'})
  id: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Key'})
  key: string;
  @ApiProperty({example: 20, description: 'Task Criteria Value'})
  value: number;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Description'})
  description: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Unique ID'})
  taskId: string;
}
