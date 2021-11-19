import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchemaSync } from 'type-graphql';
import { resolvers } from './resolvers';

const schema = buildSchemaSync({
    resolvers,
    emitSchemaFile: process.env.NODE_ENV == 'dev',
});

const apollo_server = new ApolloServer({
    schema,
    // add request and response to graphQL context
    context: ({ express }) => ({ req: express.req, res: express.res }),
});

export const graphql_handler = apollo_server.createHandler();
