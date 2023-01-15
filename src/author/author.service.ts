import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorService {

	constructor(private readonly prisma: PrismaService) {}

	async index(page: number) {
		const skip = Math.max(0, 1 * (page - 1));

		const authors = await this.prisma.author.findMany({
			take: 1,
            skip: skip,
            orderBy: {
                id: 'desc'
            }
		})

		return authors
	}

	async show(authorId: number, page: number) {
		const skip = Math.max(0, 1 * (page - 1));
		
		const author = await this.prisma.author.findUnique({
			where: {
				id: authorId
			}
		})

		const authorBooks = await this.prisma.authorBook.findMany({
			where: {
				author_id: authorId
			},
			select: { book_id: true }
		})

		const books = await this.prisma.book.findMany({
			where: {
				id: {
					in: authorBooks.map(authorBook => authorBook.book_id)
				}
			},
			take: 1,
			skip: skip,
			orderBy: {
				id: 'desc'
			},
			include: {
				category: true,
				publisher: true
			}
		})

		return books
	}
}
