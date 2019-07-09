import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './auth/jwt-strategy.service';
import { AuthService } from './auth/auth.service';
import { constants } from '../constants';
import { AuthController } from './auth/auth.controller';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './guard/roles.guard';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', property: 'profile' }),
        JwtModule.register({
            secret: constants.MASTER_SECRET_KEY,
            signOptions: {
                expiresIn: '7d'
            }
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [JwtStrategyService, AuthService, RolesGuard],
    exports: [JwtStrategyService, AuthService, RolesGuard]
})
export class CommonModule { }
