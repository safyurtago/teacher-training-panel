import { ApiProperty } from "@nestjs/swagger";


export class UpdateAdminDto {
  @ApiProperty({example: 'Jhon', description: 'Admin first name'})
  first_name: string;
  @ApiProperty({example: 'Doe', description: 'Admin last name'})
  last_name: string;
  @ApiProperty({example: 'JhonDoe@gmail.com', description: 'Admin email'})
  email: string;
  @ApiProperty({example: 'JhonDoe', description: 'Admin username'})
  username: string;
}
