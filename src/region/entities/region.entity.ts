import { ApiProperty } from "@nestjs/swagger";

export class Region {
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Region Unique Id"})
  id: string;
  @ApiProperty({example: "London", description: "Region Name"})
  name: string;
}
