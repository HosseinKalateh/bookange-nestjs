import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    username?: string;
    
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    age?: number
}