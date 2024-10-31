import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray } from "class-validator";

export class UpdateResourceDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    title?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    type?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    subject?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    gradeLevel?: string;
  
    @ApiProperty()
    @IsArray()
    @IsOptional()
    tags?: string[];
  }