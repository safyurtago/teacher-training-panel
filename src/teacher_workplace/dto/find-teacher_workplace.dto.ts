import { ApiProperty } from '@nestjs/swagger';

export class FindTeacherWorkplaceDto {
  @ApiProperty({example: "Math Teacher", description: "Teacher Position"})
  position?: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher ID'})
  teacher_username?: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'School ID'})
  school_name?: string;
}