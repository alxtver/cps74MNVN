import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../interfaces/user.interface';
import { compare } from 'bcryptjs';
import session from "express-session";

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    /**
     * Аунтификация пользователя
     */
    async login(req): Promise<{message: string, user?: {}}> {
        const username = req.body.username;
        const password = req.body.password;
        const candidate = await this.userModel.findOne({username});
        req.session.user = '';
        req.session.isAuthenticated = false;
        req.session.group = '';
        req.session.part = '';
        if (!candidate) {
            return  {message: 'wrongName'};
        }
        if (candidate) {
             const isValidPass = await compare(password, candidate.password);
             if (isValidPass) {
                 req.session.user = candidate;
                 req.session.isAuthenticated = true;
                 req.session.group = candidate.group;
                 req.session.part = candidate.lastPart;
                 req.session.save();
                 return {message: 'loginConfirm', user: candidate};
             } else {
                 return  {message: 'wrongPassword'};
             }
        }
        return {message: 'Server error'};
    }
}
