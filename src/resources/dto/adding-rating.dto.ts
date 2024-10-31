import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min, Max, IsString, IsOptional } from "class-validator";

export class AddRatingDto {
    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    comment?: string;
  }