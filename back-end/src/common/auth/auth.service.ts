import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserService } from '../../user/user.service';
import { Login } from '../interface/login.interface';
import { User } from 'src/user/interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private userService: UserService) { }

    async createToken(user: Login): Promise<any> {
        const data = await this.userService.findOne({ username: user.username });
        if (data) {
            if (await compareSync(user.password as string, data.password)) {
                const payload: JwtPayload = {
                    id: data.id,
                    email: data.email,
                    role: data.role
                };
                const token = await this.jwtService.sign(payload);
                return Promise.resolve({ token });
            }
        }
        throw new HttpException('Thông tin không hợp lệ', HttpStatus.BAD_REQUEST);

    }

    // async getUserProfile(token: string): Promise<User> {
    //     if (!token) {
    //         throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    //     }
    //     console.log(this.context.switchToHttp().getRequest());
    //     return ;
    // }

    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    async validateUser(validatePayload: JwtPayload): Promise<User> {
        console.log('auth service', validatePayload);
        
        const query = { _id: validatePayload.id };
        return await this.userService.findOne(query);
    }
}
