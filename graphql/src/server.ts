import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchemaSync } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { resolvers } from './resolvers';
import { Context } from './types/graphql.types';

/** Globals */
const WTF_TOKEN_KEY = process.env.WTF_TOKEN_KEY as string;

const schema = buildSchemaSync({
    resolvers,
    emitSchemaFile: process.env.NODE_ENV === 'dev',
});

const apollo_server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== 'production',
    // add request and response to graphQL context
    context: async ({ express }) => {
        const context: Context = {
            req: express.req,
            res: express.res,
        };

        const authorization = express.req.headers['authorization'];
        const token = authorization?.replace('Bearer ', '');

        if (token) {
            try {
                const user = jwt.verify(
                    token,
                    WTF_TOKEN_KEY,
                ) as Context['user'];

                context.user = user;
                context.token = token;
            } catch (error) {
                // continue
            }
        }

        return context;
    },
});

export const graphql_handler = apollo_server.createHandler();
