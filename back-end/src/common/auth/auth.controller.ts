import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from '../interface/login.interface';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async createToken(@Body() user: Login): Promise<any> {
        return await this.authService.createToken(user);
    }

    @Get('data')
    @UseGuards(AuthGuard())
    async findAll(): Promise<User[]> {
        return await this.authService.findAll();
    }


}
