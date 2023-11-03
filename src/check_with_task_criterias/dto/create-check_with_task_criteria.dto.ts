import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCheckWithTaskCriteriaDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: "Task Apply Id"})
  @IsString()
  @IsNotEmpty()
  task_applyId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: "Task Criteria Id"})
  @IsString()
  @IsNotEmpty()
  task_criteriaId: string;
  @ApiProperty({example: 40, description: 'Task Criteria score'})
  @IsNumber()
  @IsNotEmpty()
  criteria_score: number;
  @ApiProperty({example: 'bla bla bla bla bla', description: 'CheckWithTaskCriterias Descirption'})
  @IsString()
  @IsNotEmpty()
  description: string;
}
