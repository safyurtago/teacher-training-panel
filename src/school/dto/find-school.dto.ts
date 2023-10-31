import { ApiProperty } from "@nestjs/swagger";

export class FindSchoolDto {
  @ApiProperty({example: "London First School", description: "School Name"})
  name?: string;
  @ApiProperty({example: "Lond", description: "Region Name"})
  region_name?: string;
}
