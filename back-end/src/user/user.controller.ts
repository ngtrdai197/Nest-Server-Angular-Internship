import { Controller, Post, Body, Get, UseGuards, SetMetadata, UseInterceptors, UploadedFiles, UploadedFile, Req, Delete, Param, Put } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { FilesInterceptor, FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from './interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guard/roles.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserRole } from './interface/index';
import { Request } from 'express';
import * as fs from 'fs';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files) {
        files.map(async file => {
            await fs.watchFile(__dirname + '/public/avatars', file);
        });
    }

    @Post('save')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files) {
        console.log(files);

    }

    @Put('update')
    @SetMetadata('roles', [UserRole.Admin, UserRole.User])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: __dirname + '../../../public/avatars',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async update(@Body() createUserDto: CreateUserDto, @UploadedFile() file): Promise<User> {
        if (file) {
            createUserDto.avatar = `avatars/${file.filename}`;
        }
        return await this.userService.update(createUserDto);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Delete(":id")
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async delelte(@Param("id") id: string): Promise<any> {
        return await this.userService.delete(id);
    }

    @Get()
    @SetMetadata('roles', [UserRole.User])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
}
