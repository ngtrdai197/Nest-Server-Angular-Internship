import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../../user/interface";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // lấy thông tin  của setmetadata có tên là roles ở controller
        const roles = this._reflector.get<UserRole[]>('roles', context.getHandler());
        if (!roles || roles.length === 0) {
            return true;
        }
        const request = await context.switchToHttp().getRequest();
        const user = request.user || request.profile;
        
        const hasRole = () => roles.indexOf(user.role) >= 0;
        if (user && user.role && hasRole()) {
            return true;
        }
        throw new HttpException('You do not have permission (Role)', HttpStatus.FORBIDDEN);

    }
}