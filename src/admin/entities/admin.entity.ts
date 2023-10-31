import { ApiProperty } from "@nestjs/swagger";

export class Admin {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Admin Unique ID'})
  id: string;
  @ApiProperty({example: 'Jhon', description: 'Admin first name'})
  first_name: string;
  @ApiProperty({example: 'Doe', description: 'Admin last name'})
  last_name: string;
  @ApiProperty({example: 'JhonDoe@gmail.com', description: 'Admin email'})
  email: string;
  @ApiProperty({example: 'JhonDoe', description: 'Admin username'})
  username: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin hashed password'})
  hashed_password: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin hashed refresh token'})
  hashed_refresh_token: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin activation link'})
  activation_link: string;
  @ApiProperty({example: false, description: 'Admin status'})
  is_active: boolean;
}
