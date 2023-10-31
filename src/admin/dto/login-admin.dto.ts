import { ApiProperty } from "@nestjs/swagger";


export class LoginAdminDto {
  @ApiProperty({example: 'JhonDoe@gmail.com', description: 'Admin email'})
  email: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin password'})
  password: string;
}