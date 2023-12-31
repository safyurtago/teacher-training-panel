import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateTeacherPersonalInfoDto {
  @ApiProperty({example: "Uzbek", description: "Teacher Nationality"})
  nationality?: string;
  @ApiProperty({example: "male", description: "Teacher Gender"})
  gender?: string;
  @ApiProperty({example: "1990-10-15T00:00:00Z", description: "Teacher birth date"})
  birthDate?: string;
  @ApiProperty({example: "AA1234567", description: "Teacher serial number"})
  passport_serial?: string;
  @ApiProperty({example: true, description: "TeacherPersonalInfo status (true)"})
  is_active?: boolean;
}
