import { USERNAME_TAKED_BEFORE } from './decorator/response.constants';
import { EditUserDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { json } from 'stream/consumers';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async update(userId: number, dto: EditUserDto) {
        // Check userName uniqueness 
        if (dto.username) {
            const dbUser = await this.prisma.user.findUnique({
                where: {
                    username: dto.username
                }
            })
            
            if (dbUser != null && dbUser.id != BigInt(userId)) {
                throw new ForbiddenException(
                    USERNAME_TAKED_BEFORE
                  );
            }
        }
        
        const user = this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        })

        delete (await user).password;
        delete (await user).is_superuser;
        
        return user;
    }

    async getWishlist(userId: number) {

    }

    async addBookToWishlist(userId: number, bookId: number) {
        // Check book existing in db 
        const dbBook = await this.prisma.book.findUnique({
            where: {
                id: bookId
            },
            select: {
                name: true
            }
        })
        
        if (dbBook == null) {
            throw new ForbiddenException('bookId is invalid')
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                wishlist: true
            }
        })

        // Check that this book is existing in user wishlist or not ? 
        if (user.wishlist == null) {
            const whishlist = [dbBook] as Prisma.JsonArray

            await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    wishlist: whishlist
                }
            })
        } else {
            const userWishlist = user.wishlist as Prisma.JsonArray

            userWishlist.push(dbBook)
            
            await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    wishlist: userWishlist
                }
            })
        }

        return { msg: 'Book added to your wishlist successfully' }
    }
}
