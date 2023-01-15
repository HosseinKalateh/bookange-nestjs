import { PUBLISHER_LIST, PUBLISHER_SHOW } from './decorator/response.constants';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, Version, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { PublisherService } from './publisher.service'

@Controller('publishers')
@UseGuards(AuthGuard('jwt'))
export class PublisherController {

	constructor(private readonly publisherService: PublisherService) {}

	@Get()
    @Version('1')
	async index(@Query('page') page?: number) {
		const result = await this.publisherService.index(page ?? 0)

		return { message: PUBLISHER_LIST, result }
	}

	@Get(':id')
	@Version('1')
	async show(
		@Param('id', ParseIntPipe) publisherId: number,
		@Query('page') page?: number
	) {
		const result = await this.publisherService.show(publisherId, page ?? 0)

		return { message: PUBLISHER_SHOW, result }
	}
}
