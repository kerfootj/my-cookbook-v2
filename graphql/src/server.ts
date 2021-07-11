import { ApolloServer } from 'apollo-server-lambda';
import { TestResolver } from './resolvers/test';
import { TestType } from './schema/test';

const apollo_server = new ApolloServer({
    resolvers: TestResolver,
    typeDefs: TestType,
});

export const graphql_handler = apollo_server.createHandler();
