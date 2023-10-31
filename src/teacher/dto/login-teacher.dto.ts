import { ApiProperty } from "@nestjs/swagger";


export class LoginTeacherDto {
  @ApiProperty({example: 'JhonDoe@gmail.com', description: 'Teacher email'})
  email: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Teacher password'})
  password: string;
}