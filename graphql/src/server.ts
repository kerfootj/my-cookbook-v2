import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchemaSync } from 'type-graphql';
import { resolvers } from './resolvers';

const schema = buildSchemaSync({
    resolvers,
    emitSchemaFile: true,
});

const apollo_server = new ApolloServer({
    schema,
});

export const graphql_handler = apollo_server.createHandler();
