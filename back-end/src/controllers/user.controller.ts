import { controller, httpGet, httpPost, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { Request } from "express";
import { TYPES, constants } from "../common";
import { IUser } from "../entities";
import * as jwt from 'jsonwebtoken';
import * as httpError from 'http-errors';
import { parser } from "../middleware";
import { UserRepository } from "../repositories";
import { hashSync, compareSync } from 'bcryptjs';
import { email } from '../common/email';

@controller("/user")
export class UserController {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: UserRepository
  ) { }

  @httpGet("/", parser(['admin']))
  public async findAll(): Promise<IUser[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  @httpGet("/:id")
  public async findOne(req: Request): Promise<IUser> {
    try {
      const query = { _id: req.params.id };
      return await this.userRepository.findOne(query);
    } catch (error) {
      throw error;
    }
  }

  @httpPost("/")
  public async create(req: Request): Promise<IUser> {
    try {
      const user = req.body as IUser;
      const checkUserName = await this.userRepository.findOne({ username: user.username });
      if (!checkUserName) {
        const checkEmail = await this.userRepository.findOne({ email: user.email });
        if (!checkEmail) {
          user.password = hashSync((user.password as string), 10);
          user.email = hashSync((user.email as string), 10);

          return await this.userRepository.create(user);
        }
        throw httpError(400, 'Email đã bị trùng');
      }
      throw httpError(400, 'Username đã bị trùng');
    } catch (error) {
      throw error;
    }
  }

  @httpPost("/auth/login")
  public async login(req: Request): Promise<any> {
    try {
      const { body } = req;
      const user = await this.userRepository.findOne({ username: body.username });
      if (user) {
        const compare = await compareSync(body.password, user.password as string);
        if (compare) {
          const token = await jwt.sign({
            id: user.id, username: user.username
          }, constants.SECRECT_KEY, { expiresIn: '1h' });
          return Promise.resolve({ token });
        }
        throw httpError(400, 'Mật khẩu không chính xác');
      }
      throw httpError(400, 'Thông tin không chính xác');
    } catch (error) {
      throw error;
    }
  }

  @httpGet('/email/otp')
  public async sendMail(): Promise<any> {
    try {
      const receiver = 'ngtrdai290197@gmail.com';
      const content = `
                <div style="color:black;">
                <h3 >Hi Nguyen Dai,</h3>
                <p>Your recently requested to reset your password for your Shop 3s account.Click the button below to reset it.</p>
                <p><a href="www.facebook.com/ngtrdai197" style="background-color:#242234;color:#fff; border:none; 
                padding:12px 20px;font-size:15px;cursor:pointer;display: inline-block;text-decoration:none;">Reset password</a></p>
                <p>If you did not request a password reset, please ignore this email or reply to let us know.</p>
                <p>Thanks,</p>
                <div>
                `;
      const result = await email.sendEmail(receiver, content);
      if (result) {
        return Promise.resolve({ statusCode: 200, message: 'Email đã gử i đi thành công' });
      }
      return Promise.reject({ statusCode: 404, message: 'Email không tồn tại trên hệ thống. Kiểm tra lại' });
    } catch (error) {
      throw error;
    }
  }

  @httpPut("/")
  public async update(req: Request): Promise<IUser> {
    try {
      return await this.userRepository.update(req.body);
    } catch (error) {
      throw error;
    }
  }

  @httpDelete("/:id")
  public async delete(req: Request): Promise<any> {
    try {
      return await this.userRepository.delete(req.params.id);
    } catch (error) {
      throw error;
    }
  }
}
