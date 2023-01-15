import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TranslatorService {

	constructor(private readonly prisma: PrismaService) {}

	async index(page: number) {
		const skip = Math.max(0, 1 * (page - 1));

		const translators = await this.prisma.translator.findMany({
			skip: skip,
			take: 1,
			orderBy: {
				id: 'desc'
			}
		});

		return translators
	}

	async show(translatorId: number, page: number) {
		const skip = Math.max(0, 1 * (page - 1));

		const translator = await this.prisma.translator.findUnique({
			where: {
				id: translatorId
			}
		})

		const bookTranslators = await this.prisma.bookTranslator.findMany({
			where: {
				translator_id: translatorId
			},
			select: { book_id: true }
		})

		const books = await this.prisma.book.findMany({
			where: {
				id: {
					in: bookTranslators.map(bookTranslators => bookTranslators.book_id)
				}
			},
			skip: skip,
			take: 1,
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
