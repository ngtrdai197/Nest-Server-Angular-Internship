import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { User } from './interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
}
