import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://api.wtf2cook.ca/graphql'
            : 'http://localhost:3000/dev/graphql',
    cache: new InMemoryCache(),
});

export default client;
