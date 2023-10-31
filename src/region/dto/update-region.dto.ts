import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegionDto {
  @ApiProperty({example: "London", description: "Region Name"})
  name?: string;
}
