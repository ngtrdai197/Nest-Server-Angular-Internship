import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ParserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // req.userProfile = req.headers.authorization;
        // console.log('middleware',req.headers.authorization);
        console.log('middleware', req.user);

        
        next();
    }
}