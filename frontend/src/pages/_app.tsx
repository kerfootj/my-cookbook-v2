/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import NavBar from '../components/NavBar';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: ['Raleway', 'Arial', 'helvetica', 'sans-serif'].join(),
        body1: {
            fontFamily: ['Bitter', 'Georgia', 'sans-serif'].join(),
        },
    },
});

const base_link = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://api.wtf2cook.ca/graphql'
            : 'http://localhost:3000/dev/graphql',
});

const auth_link = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: auth_link.concat(base_link),
    cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavBar />
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
