import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublisherService {

    constructor(private readonly prisma: PrismaService) {}

    async index(page: number) {
        const skip = Math.max(0, 1 * (page - 1))
        
        const publishers = await this.prisma.publisher.findMany({
            orderBy: {
                id: 'desc'
            },
            skip: skip,
            take: 1
        })

        return publishers
    }

    async show(publisherId: number, page: number) {
        const skip = Math.max(0, 1 * (page - 1))

        const publisher = await this.prisma.publisher.findUnique({
            where: {
                id: publisherId
            },
            include: {
                books: {
                    orderBy: {
                        id: 'desc'
                    },
                    skip: skip,
                    take: 1
                }
            }
        })

        return publisher.books
    }
}
