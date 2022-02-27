import { Request, Response } from 'express';
import { User } from '../schema/user';

export interface Context {
    req: Request;
    res: Response;
    token?: string;
    user?: User;
}
