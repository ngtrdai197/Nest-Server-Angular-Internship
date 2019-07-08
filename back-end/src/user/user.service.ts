import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync, compareSync } from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from './interface';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const checkUserName = await this.userModel.findOne({ username: createUserDto.username });
            if (!checkUserName) {
                const hashEmail = hashSync(createUserDto.email, 10);
                console.log(hashEmail);
                
                const checkEmail = await this.userModel.findOne({ email: hashEmail });
                // console.log(createUserDto);
                console.log(checkEmail);


                // console.log(await compareSync(createUserDto.email as string, checkEmail.email));

                // if (!await compareSync(createUserDto.email as string, checkEmail.email)) {
                //     (createUserDto.password as string) = hashSync((createUserDto.password as string), 10);
                //     (createUserDto.email as string) = hashSync((createUserDto.email as string), 10);

                //     return await this.userModel.create(createUserDto);
                // }
                throw new HttpException('Email đã bị trùng', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Username đã bị trùng', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw error;
        }
    }
    async findAll(): Promise<User[]> {
        try {
            return await this.userModel.find();
        } catch (error) {
            throw error;
        }
    }
    async findOne(query: any): Promise<User> {
        try {
            return this.userModel.findOne(query);
        } catch (error) {
            throw error;
        }
    }
    async delete(id: string): Promise<any> {
        try {
            return this.userModel.deleteOne({ _id: id });
        } catch (error) {
            throw error;
        }
    }
}
