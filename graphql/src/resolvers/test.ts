import { env } from '../environment';

export const TestResolver = {
    Query: {
        message: (): string => env.message,
    },
};
