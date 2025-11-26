import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class AiDiagnosisDto {
  @ApiProperty({
    example: "The patient has been experiencing an allergy for a few hours, apparently after lunch",
    description: "Information about the patient to generate AI diagnosis"
  })
  @IsString()
  @IsNotEmpty()
  information: string;
}