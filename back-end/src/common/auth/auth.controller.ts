import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from '../interface/login.interface';
import { AuthGuard } from '@nestjs/passport';
import { User, UserRole } from '../../user/interface';
import { Request } from 'express';
import { RolesGuard } from '../guard/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async createToken(@Body() user: Login): Promise<any> {
        return await this.authService.createToken(user);
    }

    @Get('userprofile')
    @SetMetadata('roles', [UserRole.Admin, UserRole.User])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getUserProfile(@Req() req: any) {
        const user = {
            role: req.profile.role,
            username: req.profile.username,
            _id: req.profile._id,
            fullName: req.profile.fullName,
            email: req.profile.email,
            address: req.profile.address,
            phone: req.profile.phone
        }
        return user;
    }


}
