import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.userModel.create(createUserDto);
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
}
