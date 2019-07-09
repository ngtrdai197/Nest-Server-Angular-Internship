import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { constants } from '../../constants';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: constants.MASTER_SECRET_KEY
        })
    }

    async validate(payload: JwtPayload) {
        console.log('jwt-strategy', payload);

        const userProfile = await this.authService.validateUser(payload);
        if (!userProfile) {
            throw new UnauthorizedException();
        }
        return 123; //trả về thông tin user để middleware (roles guard) get được thông tin của user
    }

}
