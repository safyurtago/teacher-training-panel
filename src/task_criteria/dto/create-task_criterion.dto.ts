import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskCriterionDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Key'})
  @IsString()
  @IsNotEmpty()
  key: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Value'})
  @IsNumber()
  @IsNotEmpty()
  value: number;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Criteria Description'})
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Unique ID'})
  @IsString()
  @IsNotEmpty()
  taskId: string;
}
