import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherWorkplaceDto {
  @ApiProperty({example: "Math Teacher", description: "Teacher Position"})
  @IsString()
  @IsNotEmpty()
  position: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher ID'})
  @IsString()
  @IsNotEmpty()
  teacherId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'School ID'})
  @IsString()
  @IsNotEmpty()
  schoolId: string;
}
