import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from '../interface/login.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async createToken(@Body() user: Login): Promise<any> {
        // return await this.authService.createToken(user);
    }
}
