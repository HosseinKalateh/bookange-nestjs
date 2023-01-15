import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService) {}

    async index(page: number) {
        const skip = Math.max(0, 1 * (page - 1))

        const books = await this.prisma.book.findMany({
            include: {
                category: true,
                publisher: true
            },
            skip: skip,
            take: 1,
            orderBy: {
                id: 'desc'
            }
        })

        return books
    }

    async show(bookId: number) {
        const book = await this.prisma.book.findUnique({
            where: {
                id: bookId
            },
            include: {
                category: true,
                publisher: true
            }
        })

        return book
    }
}
