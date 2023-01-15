import { Controller, Post, HttpCode, Version, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/index';

@Controller('auth')
export class AuthController {
    constructor(private authServie: AuthService) {}

    @HttpCode(200)
    @Post('login')
    @Version('1')
    async login(@Body() dto: LoginDto) {
        const result = await this.authServie.login(dto)

        return { message: 'login', result };
    }
}
