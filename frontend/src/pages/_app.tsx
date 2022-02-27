/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
    useMutation,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { User } from '../types/user.type';
import { loginWithGoogle } from '../mutations/auth';
import Loading from '../components/Loading';

/** Globals */
const TOKEN = 'wtf2cook_token';

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
    const token = localStorage.getItem(TOKEN);

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
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [loading_auth, setLoadingAuth] = useState(true);

    // build login with google mutation
    const [loginMutation] = useMutation<
        { loginWithGoogle: { token: string; user: User } },
        { input: { id_token: string } }
    >(loginWithGoogle, {
        client,
        onCompleted: (result) => {
            if (result.loginWithGoogle.token === 'failed to verify id token') {
                setLoadingAuth(false);
                localStorage.removeItem(TOKEN);

                return;
            }

            // set token in local storage, attached to all gql requests in a `Authorization` header
            localStorage.setItem(TOKEN, result.loginWithGoogle.token);

            setLoadingAuth(false);
            setUser(result.loginWithGoogle.user);
        },
        onError: () => {
            setLoadingAuth(false);
            localStorage.removeItem(TOKEN);
        },
    });

    useEffect(() => {
        const id_token = localStorage.getItem(TOKEN);

        if (id_token && !user) {
            loginMutation({ variables: { input: { id_token } } });
        } else {
            setLoadingAuth(false);
        }
    }, []);

    useEffect(() => {
        const start = () => setLoading(true);
        const stop = () => setLoading(false);

        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', stop);
        Router.events.on('routeChangeError', stop);
        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', stop);
            Router.events.off('routeChangeError', stop);
        };
    }, []);

    const login = (id_token: string) => {
        loginMutation({ variables: { input: { id_token } } });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(TOKEN);
    };

    return (
        <>
            <Head>
                {/* <a href="https://www.flaticon.com/free-icons/fork" title="fork icons">Fork icons created by Freepik - Flaticon</a> */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5b86d5"
                />
                <meta name="msapplication-TileColor" content="#2d89ef" />
                <meta name="theme-color" content="#6a6a6a" />
            </Head>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <NavBar
                        user={user}
                        loading_auth={loading_auth}
                        login={login}
                        logout={logout}
                    />
                    {loading ? (
                        <Loading />
                    ) : (
                        <Component {...pageProps} user={user} />
                    )}
                </ThemeProvider>
            </ApolloProvider>
        </>
    );
}

export default App;
