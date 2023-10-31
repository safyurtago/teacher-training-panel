import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class FindFilteredAdminsDto {
  @ApiProperty({example: 'Jhon', description: 'Admin first name'})
  first_name?: string;
  @ApiProperty({example: 'Doe', description: 'Admin last name'})
  last_name?: string;
  @ApiProperty({example: 'JhonDoe@gmail.com', description: 'Admin email'})
  email?: string;
  @ApiProperty({example: 'JhonDoe', description: 'Admin username'})
  username?: string;
}