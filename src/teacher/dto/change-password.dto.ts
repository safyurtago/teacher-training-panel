import { ApiProperty } from "@nestjs/swagger";


export class ChangePasswordDto {
  @ApiProperty({example: 'JhonDoe', description: 'Teacher username'})
  username: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Teacher old password'})
  old_password: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Teacher new password'})
  new_password: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Teacher confirm new password'})
  confirm_new_password: string;
}