import { ApiProperty } from "@nestjs/swagger";

export class FindTeacherPersonalInfoDto {
  // @ApiProperty({example: "879b0fc6-74ea-4100-86cd-f6debf05971a", description: "Teacher Unique ID" })
  // teacher_username?: string;
  @ApiProperty({example: "Uzbek", description: "Teacher Nationality"})
  nationality?: string;
  @ApiProperty({example: "1990-10-15T00:00:00Z", description: "Teacher birth date"})
  birthDate?: Date;
  @ApiProperty({example: "male", description: "Teacher Gender"})
  gender?: string;
  @ApiProperty({example: "greater", description: "Teacher greater than birth date"})
  greater?: string;
  @ApiProperty({example: "less", description: "Teacher less than birth date"})
  less?: string;
  @ApiProperty({example: "AA1234567", description: "Teacher serial number"})
  passport_serial?: string;
  @ApiProperty({example: true, description: "TeacherPersonalInfo status (true)"})
  is_active?: boolean;
}