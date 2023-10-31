import { ApiProperty } from "@nestjs/swagger";

export class TeacherWorkplace {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher Workplace Unique ID'})
  id: string;
  @ApiProperty({example: "Math Teacher", description: "Teacher Position"})
  position: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher ID'})
  teacherId: string;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'School ID'})
  schoolId: string;
}
