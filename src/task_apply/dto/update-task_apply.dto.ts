import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateTaskApplyDto {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Task Apply Unique ID'})
  @IsString()
  @IsOptional()
  taskId: string;
  @ApiProperty({example: 78, description: 'Task Apply socre 78/100'})
  @IsString()
  @IsOptional()
  overal_score: number;
  @ApiProperty({example: 'smth about task', description: 'Task Apply Description'})
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.pdf', description: 'Task Apply File '})
  @IsOptional()
  image: any;
}
