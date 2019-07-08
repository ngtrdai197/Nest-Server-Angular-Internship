import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { AuthService } from './auth/auth.service';
import { constants } from 'src/constants';
import { AuthController } from './auth/auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: constants.MASTER_SECRET_KEY,
            signOptions: {
                expiresIn: 3600
            }
        })
    ],
    controllers: [AuthController],
    providers: [JwtStrategyService, AuthService],
    exports: [JwtStrategyService, AuthService]
})
export class CommonModule { }
