import { NestMiddleware } from '@nestjs/common/interfaces';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
declare module 'express' {
  export interface Request {
    currentUser?: User;
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      if (user) {
        req.currentUser = user;
      }
    }

    next();
  }
}
