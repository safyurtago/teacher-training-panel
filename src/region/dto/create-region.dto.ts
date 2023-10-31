import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
  @ApiProperty({example: "London", description: "Region Name"})
  @IsString()
  @IsNotEmpty()
  name: string;
}
