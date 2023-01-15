import { TRANSLATORS_LIST, TRANSLATORS_SHOW } from './decorator/response.constants';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Version, ParseIntPipe, Param, UseGuards, Query } from '@nestjs/common';
import { TranslatorService } from './translator.service';

@UseGuards(AuthGuard('jwt'))
@Controller('translators')
export class TranslatorController {

	constructor(private readonly translatorService: TranslatorService) {}

	@Get()
	@Version('1')
	async index(@Query('page') page?: number) {
		const result = await this.translatorService.index(page ?? 0)

		return { message: TRANSLATORS_LIST, result }
	}

	@Get(':id')
	@Version('1')
	async show(
		@Param('id', ParseIntPipe) translatorId: number,
		@Query('page') page?: number
	) {
		const result = await this.translatorService.show(translatorId, page ?? 0)

		return { message: TRANSLATORS_SHOW, result }
	}
}
