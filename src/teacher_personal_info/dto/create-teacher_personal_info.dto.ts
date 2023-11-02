import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherPersonalInfoDto {
  @ApiProperty({example: "Uzbek", description: "Teacher Nationality"})
  nationality: string;
  @ApiProperty({example: "male", description: "Teacher Gender"})
  gender: string;
  @ApiProperty({example: "1990-10-15T00:00:00Z", description: "Teacher birth date"})
  birthDate?: Date;
  @ApiProperty({example: "AA1234567", description: "Teacher serial number"})
  passport_serial: string;
  @ApiProperty({example: '1234567', description: 'file'})
  photo: string;
}
