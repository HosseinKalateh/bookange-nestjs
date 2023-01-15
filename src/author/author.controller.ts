import { AUTHOR_LIST, AUTHOR_SHOW } from './decorator/response.constants';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Version, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { AuthorService } from './author.service';

@UseGuards(AuthGuard('jwt'))
@Controller('authors')
export class AuthorController {

	constructor(private readonly authorService: AuthorService) {}

	@Get()
	@Version('1')
	async index(@Query('page') page?: number) {
		const result = await this.authorService.index(page ?? 0)

		return { message: AUTHOR_LIST, result }
	}

	@Get(':id')
	@Version('1')
	async show(
		@Param('id', ParseIntPipe) authorId: number,
		@Query('page') page?: number
	) {
		const result = await this.authorService.show(authorId, page ?? 0)

		return { message: AUTHOR_SHOW, result }
	}
}
