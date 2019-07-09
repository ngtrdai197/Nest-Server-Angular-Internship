import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from '../interface/login.interface';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/interface';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async createToken(@Body() user: Login): Promise<any> {
        return await this.authService.createToken(user);
    }

    @Get('data')
    async findAll(@Req() req: Request): Promise<User[]> {
        return await this.authService.findAll();
    }


}
