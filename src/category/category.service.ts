import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async index(page: number) {
        const skip = Math.max(0, 1 * (page - 1));
        
        return await this.prisma.category.findMany({
            where: {
                is_active: true
            },
            take: 1,
            skip: skip,
            orderBy: {
                id: 'desc'
            }
        });
    }

    async show(categoryId: number, page: number) {
        const skip = Math.max(0, 1 * (page - 1));

        const category = await this.prisma.category.findUnique({
            where: {
                id: categoryId,
            },
            include: {
                books: {
                    take: 1,
                    skip: skip,
                    orderBy: {
                        id: 'desc'
                    }
                }
            },
        });
        
        return category.books;
    }
}
 