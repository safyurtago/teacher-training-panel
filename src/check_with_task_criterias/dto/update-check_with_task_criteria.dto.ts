import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCheckWithTaskCriteriaDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: "Task Apply Id"})
  @IsString()
  @IsOptional()
  task_applyId?: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: "Task Criteria Id"})
  @IsString()
  @IsOptional()
  task_criteriaId?: string;
  @ApiProperty({example: 40, description: 'Task Criteria score'})
  @IsNumber()
  @IsOptional()
  criteria_score?: number;
  @ApiProperty({example: 'bla bla bla bla bla', description: 'CheckWithTaskCriterias Descirption'})
  @IsString()
  @IsOptional()
  description?: string;
}
