import { ApiProperty } from '@nestjs/swagger';

export class FindRegionDto {
  @ApiProperty({example: "London", description: "Region Name"})
  name?: string;
}
