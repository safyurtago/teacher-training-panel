import { ApiProperty } from "@nestjs/swagger";

export class Training {
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a', description: 'Training Unique ID'})
  id: string;
  @ApiProperty({example: 'Training title', description: 'Training title'})
  title: string;
  @ApiProperty({example: 'blablablabalb', description: 'Training description'})
  description: string;
  @ApiProperty({example: 'Math', description: 'Training subject'})
  subject: string;
  @ApiProperty({example: 100, description: 'Training maximal score'})
  max_score: number;
  @ApiProperty({example: 50, description: 'Training pass score'})
  pass_score: number;
  @ApiProperty({example: '879b0fc6-74ea-4100-86cd-f6debf05971a.jpg/pdf', description: 'file for training'})
  file: string;
  @ApiProperty({example: true, description: 'Training status'})
  is_acitve: boolean;
}
