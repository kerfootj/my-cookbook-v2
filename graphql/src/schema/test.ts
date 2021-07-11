import { gql } from 'apollo-server-lambda';

export const TestType = gql`
    type Query {
        message: String!
    }
`;
