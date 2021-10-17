/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
    palette: {
        type: 'dark',
    },
    typography: {
        fontFamily: ['Raleway', 'Arial', 'helvetica', 'sans-serif'].join(),
        body1: {
            fontFamily: ['Bitter', 'Georgia', 'sans-serif'].join(),
        },
    },
});

const client = new ApolloClient({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://api.wtf2cook.ca/graphql'
            : 'http://localhost:3000/dev/graphql',
    cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
