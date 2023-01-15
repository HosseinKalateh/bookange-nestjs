import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AddToWishlistDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    bookId: number
}