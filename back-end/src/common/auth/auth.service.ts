import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { User } from 'dist/user/interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private userService: UserService) { }

    async createToken(user: CreateUserDto): Promise<any> {
        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        const token = await this.jwtService.sign(payload);
        return Promise.resolve({ token });
    }

    async validateUser(validatePayload: JwtPayload): Promise<User> {
        const query = { _id: validatePayload.id };
        return await this.userService.findOne(query);
    }
}
