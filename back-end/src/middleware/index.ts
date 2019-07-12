import { NestMiddleware, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { constants } from '../constants';
import { UserService } from '../user/user.service';

@Injectable()
export class ParserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }
    use(req, res, next) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, constants.MASTER_SECRET_KEY, async (err, payload) => {
                if (!err) {
                    const user = await this.userService.findOne({ _id: payload.id });
                    req.user = {
                        role: user.role,
                        username: user.username,
                        _id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        address: user.address,
                        phone: user.phone,
                        avatar: user.avatar
                    }
                    next();
                }
                else {
                    return res.status(403).json(err);
                }
            })
        } else {
            return res.status(401).json("You must provide a valid authenticated access token.");
        }
    }
}