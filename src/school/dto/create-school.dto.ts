import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSchoolDto {
  @ApiProperty({example: "London First School", description: "School Name"})
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Region Id"})
  @IsString()
  @IsNotEmpty()
  region_id: string;
}
