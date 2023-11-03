import { ApiProperty } from "@nestjs/swagger";

export class TeacherPersonalInfo {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher Personal Info Unique ID'})
  id: string;
  @ApiProperty({example: "879b0fc6-74ea-4100-86cd-f6debf05971a", description: "Teacher Unique ID" })
  teacherId: string;
  @ApiProperty({example: "Uzbek", description: "Teacher Nationality"})
  nationality: string;
  @ApiProperty({example: "male", description: "Teacher Gender"})
  gender: string;
  @ApiProperty({example: "1990-10-15T00:00:00Z", description: "Teacher birth date"})
  birthDate: string;
  @ApiProperty({example: "AA1234567", description: "Teacher serial number"})
  passport_serial: number;
  @ApiProperty({example: true, description: "TeacherPersonalInfo status (true)"})
  is_active: boolean;
  @ApiProperty({example: "879b0fc6-74ea-4100-86cd-f6debf05971a879b0fc6-74ea-4100-86cd-f6debf05971a", description: "Tecaher photo"})
  photo: string;
}
