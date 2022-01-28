import { Request, Response } from 'express';

export interface Context {
    req: Request;
    res: Response;
    token?: string;
    user?: {
        id: string;
        email: string;
        name: string;
        picture: string | null;
    };
}
