import { ApiProperty } from '@nestjs/swagger';

export class UpdateSchoolDto {
  @ApiProperty({example: "London First School", description: "School Name"})
  name?: string;
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Region Id"})
  region_id?: string;
}
