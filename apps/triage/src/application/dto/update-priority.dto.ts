import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePriorityDto {
  @ApiProperty({
    description: 'New urgency level: 1 (critical) to 5 (very low)',
    example: 2,
    enum: [1, 2, 3, 4, 5],
    enumName: 'UrgencyLevel',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  urgencyLevel: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({
    description: 'Reason for changing the priority level',
    example: 'Patient condition has deteriorated based on latest vital signs',
    type: 'string',
  })
  @IsString()
  reason: string;

  @ApiProperty({
    description: 'ID of the user updating the priority',
    example: 47,
    type: 'integer',
  })
  @IsNumber()
  @Type(() => Number)
  updatedBy: number;
}
