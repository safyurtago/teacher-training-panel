import { ApiProperty } from "@nestjs/swagger";

export class CheckWithTaskCriteria {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'CheckWithTaskCriterias Unique ID'})
  id: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: "Task Apply Id"})
  task_applyId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: "Task Criteria Id"})
  task_criteriaId: string;
  @ApiProperty({example: 40, description: 'Task Criteria score'})
  criteria_score: number;
  @ApiProperty({example: 'bla bla bla bla bla', description: 'CheckWithTaskCriterias Descirption'})
  description: string;
}
