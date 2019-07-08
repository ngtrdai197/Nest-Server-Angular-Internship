import { Controller, Post, Body, Get, UseGuards, SetMetadata, UseInterceptors, UploadedFiles, UploadedFile, Req, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { FilesInterceptor, FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from './interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guard/roles.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserRole } from './interface/index';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('media', {
        storage: diskStorage({
            destination: './src/public/avatars',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    uploadFile(@UploadedFile() file) {
        console.log(file.path);
    }

    @Post('save')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files) {
        console.log(files);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Delete(":id")
    async delelte(@Param("id") id: string):Promise<any>{
        return await this.userService.delete(id);
    }

    @Get()
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
}
