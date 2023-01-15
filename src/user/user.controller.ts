import { SHOW_USER_PROFILE, USER_PROFILE_UPDATED_SUCCESSFULLY, BOOK_ADDED_TO_USER_WISHLIST_SUCCESSFULLY } from './decorator/response.constants';
import { AddToWishlistDto, EditUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Controller, Patch, Version, Param, ParseIntPipe, UseGuards, Body, Get, Post, HttpCode } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from './decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Version('1')
    @Get('profile')
    show(@GetUser() user: User) {
        const result = user;
        return { message: SHOW_USER_PROFILE, result};
    }

    @Version('1')
    @Patch('profile')
    async update(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto
    ) {
        const result = await this.userService.update(userId, dto);

        return { message: USER_PROFILE_UPDATED_SUCCESSFULLY, result }
    }

    @Version('1')
    @Get('wishlist')
    async getWishlist(@GetUser('id') userId: number) {
        const result = await this.userService.getWishlist(userId)

        return { message: SHOW_USER_PROFILE, result }
    }

    @Version('1')
    @Post('wishlist')
    @HttpCode(200)
    async addBookToWishlist(
        @GetUser('id') userId: number,
        @Body() dto: AddToWishlistDto
    ) 
    {
        const result = await this.userService.addBookToWishlist(userId, dto.bookId)

        return { message: BOOK_ADDED_TO_USER_WISHLIST_SUCCESSFULLY, result }
    }
}
