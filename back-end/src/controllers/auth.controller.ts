import { inject } from "inversify";
import { TYPES, constants } from "../common";
import { IUserRepository } from "../IRepositories";
import { httpPost, httpGet, controller } from "inversify-express-utils";
import { Request } from "express";
import { IUser } from "../entities";
import { compareSync } from 'bcryptjs';
import * as httpErrors from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { parser } from "../middleware";

@controller('/auth')
export class AuthController {
    constructor(@inject(TYPES.IUserRepository) private userRepo: IUserRepository) { }

    @httpPost('/login')
    async login(req: Request): Promise<any> {
        try {
            const user = req.body as IUser;
            const data = await this.userRepo.findOne({ username: user.username });
            if (data) {
                if (await compareSync(user.password as string, data.password as string)) {
                    const payload = {
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        role: data.role
                    };
                    const token = await jwt.sign(payload, constants.SECRECT_KEY, { expiresIn: '7d' });
                    return Promise.resolve({ token });
                }
            }
            throw httpErrors(400, 'Thông tin đăng không hợp lệ');
        } catch (error) {
            throw error;
        }
    }

    @httpPost('/changepassword')
    async changePassword(req: Request): Promise<any> {
        const body = req.body as IUser;
        const user = await this.userRepo.findOne({ username: body.username });
        if (user) {
            return user; // check salt and sent mail to verify
        }
    }

    @httpGet('/profile', parser([constants.ROLES.ADMIN, constants.ROLES.USER]))
    async getUserProfile(req: any): Promise<any> {
        return await this.userRepo.getUserProfole({ _id: req.user.id });
    }
}