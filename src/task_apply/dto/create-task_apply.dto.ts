import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Apply Unique ID'})
  @IsString()
  @IsNotEmpty()
  taskId: string;
  @ApiProperty({example: 'smth about task', description: 'Task Apply Description'})
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.pdf', description: 'Task Apply File '})
  @IsOptional()
  image: any;
}
