import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({example: 'Jhon', description: 'Admin first name'})
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @ApiProperty({example: 'Doe', description: 'Admin last name'})
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @ApiProperty({example: 'JhonDoe@gmail.com', description: 'Admin email'})
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({example: 'JhonDoe', description: 'Admin username'})
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin password'})
  @MinLength(6)
  @IsStrongPassword()
  password: string;
  @ApiProperty({example: '$2a$12$xrIH7EaQ.O1OGLpx69RnDOK8A0dnwq5On8qEEPlsAv5Ohs8g1onL.', description: 'Admin confirm password'})
  @MinLength(6)
  @IsStrongPassword()
  confirm_password: string;
}
