import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from './interface';
import { CreateUserDto } from './dto';
import { IUserService } from '../interfaces/IUser.service';

@Injectable()
export class UserService implements IUserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const checkUserName = await this.userModel.findOne({ username: createUserDto.username });
            if (!checkUserName) {
                const checkEmail = await this.userModel.findOne({ email: createUserDto.email });

                if (!checkEmail) {
                    (createUserDto.password as string) = hashSync((createUserDto.password as string), 10);

                    return await this.userModel.create(createUserDto);
                }
                throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Username đã tồn tại', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw error;
        }
    }

    async update(createUserDto: CreateUserDto, fileName?: string): Promise<User> {
        try {
            const checkUser = await this.userModel.findById(createUserDto._id);
            if (checkUser) {
                return await this.userModel.findByIdAndUpdate(createUserDto._id, createUserDto);
            }
            throw new HttpException('Tài khoản không tồn tại. Kiểm tra lại', HttpStatus.BAD_REQUEST);
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
