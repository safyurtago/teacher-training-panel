import { ApiProperty } from "@nestjs/swagger";

export class ChoiceQuestion {
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Choice Question Unique Id"})
  id: string;
  @ApiProperty({example: "blablablabla", description: "Choice Question Text"})
  text: string;
  @ApiProperty({example: "blablablabla", description: "Choice Question Description"})
  description: string;
  @ApiProperty({example: "a", description: "Choice Question Description choice keys - [a, b, c, d]"})
  correct_choice: string;
}
