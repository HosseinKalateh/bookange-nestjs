import { CategoryService } from './category.service';
import { Controller, Get, Param, Version, ParseIntPipe, UseGuards, Query, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CATEGORY_LIST, CATEGORY_SHoW } from './decorator/response.constants';

@Controller('categories')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @Version('1')
    async index(@Query('page') page?: number) {
        const result = await this.categoryService.index(page ?? 0);

        return { message: CATEGORY_LIST, result };
    }

    @Get(':id')
    @Version('1')
    async show(
        @Param('id', ParseIntPipe) id: number,
        @Query('page') page?: number
    ) {
        const result = await this.categoryService.show(id, page ?? 0);

        return { message: CATEGORY_SHoW, result}
    }
}
