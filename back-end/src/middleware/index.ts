import { Request, Response, NextFunction } from "express";
import { constants } from '../common/constants';
import * as jwt from 'jsonwebtoken';
export const parser = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, constants.SECRECT_KEY, async (error: any, decoded: any) => {
        if (error) {
          return res.status(401).send({ statusCode: 401, message: 'Token invalid' });
        } else {
          if (roles.indexOf(constants.ROLES.USER) > -1 || constants.ROLES.ADMINS.indexOf(decoded.username) > -1) {
            next();
            return;
          } else {
            return res.status(403).send({ statusCode: 403, message: 'You have not permisstion' });
          }
        }
      });
    } else {
      return res.status(401).send({ statusCode: 401, message: 'Not authorized' });
    }
  };
};
