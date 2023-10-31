import { ApiProperty } from "@nestjs/swagger";

export class FindFilteredTeachersDto {
  @ApiProperty({example: 'Jhon', description: 'Teacher first name'})
  first_name?: string;
  @ApiProperty({example: 'Doe', description: 'AdTeachermin last name'})
  last_name?: string;
  @ApiProperty({example: 'JhonDoe@gmail.com', description: 'Teacher email'})
  email?: string;
  @ApiProperty({example: 'JhonDoe', description: 'Teacher username'})
  username?: string;
}