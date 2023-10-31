import { ApiProperty } from "@nestjs/swagger";

export class Teacher {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Teacher Unique ID'})
  id: string;
  @ApiProperty({example: 'Jhon', description: 'Teacher first name'})
  first_name: string;
  @ApiProperty({example: 'Doe', description: 'Teacher last name'})
  last_name: string;
  @ApiProperty({example: 'JhonDoe@gmail.com', description: 'Teacher email'})
  email: string;
  @ApiProperty({example: 'JhonDoe', description: 'Teacher username'})
  username: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Teacher hashed password'})
  hashed_password: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Teacher hashed refresh token'})
  hashed_refresh_token: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Teacher activation link'})
  activation_link: string;
  @ApiProperty({example: false, description: 'Teacher status'})
  is_active: boolean;
}
