import { ApiProperty } from "@nestjs/swagger";


export class ChangePasswordDto {
  @ApiProperty({example: 'JhonDoe', description: 'Admin username'})
  username: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin old password'})
  old_password: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin new password'})
  new_password: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin confirm new password'})
  confirm_new_password: string;
}