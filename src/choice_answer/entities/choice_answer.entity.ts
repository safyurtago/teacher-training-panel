import { ApiProperty } from "@nestjs/swagger";

export class ChoiceAnswer {
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Choice Answer Unique Id"})
  id: string;
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Choice Question Unique Id"})
  questionId: string;
  @ApiProperty({example: "bea774a3-8aa2-4554-b32a-a6bce5d31c63", description: "Teacher Unique Id"})
  teacherId: string;
  @ApiProperty({example: "a", description: "Correct answer [a, b, c, d]"})
  key: string;
  @ApiProperty({example: "blablablablabla", description: "Answer text"})
  value: string;
}
