import { BOOK_LIST, BOOK_SHOW } from './decorator/response.constants';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Version, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { BookService } from './book.service';

@UseGuards(AuthGuard('jwt'))
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    @Version('1')
    async index(@Query('page') page?: number) {
        const result = await this.bookService.index(page ?? 0)

        return { message: BOOK_LIST, result }
    }

    @Get(':id')
    @Version('1')
    async show(@Param('id', ParseIntPipe) bookId: number) {
        const result = await this.bookService.show(bookId)

        return { message: BOOK_SHOW, result }
    }
}
