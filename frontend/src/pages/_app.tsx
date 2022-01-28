/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
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

    const login = (id_token: string) => {
        loginMutation({ variables: { input: { id_token } } });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(TOKEN);
    };

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavBar
                    user={user}
                    loading_auth={loading_auth}
                    login={login}
                    logout={logout}
                />
                <Component {...pageProps} user={user} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
