import { useMutation } from '@apollo/client';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GoogleLogin, {
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';
import Link from 'next/link';
import styled from 'styled-components';
import { loginWithGoogle } from '../mutations/auth';
import { User } from '../types/user.type';
import { UserMenu } from './user/userMenu';
import SearchBar from './searchBar';

/** Globals */
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
const TOKEN = 'wtf2cook_token';

/** Styles */
const Brand = styled.div`
    cursor: pointer;
`;

const Filler = styled(Toolbar)``;

const NavBar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // build login with google mutation
    const [login] = useMutation<
        { loginWithGoogle: { token: string; user: User } },
        { input: { id_token: string } }
    >(loginWithGoogle, {
        onCompleted: (result) => {
            // set token in local storage, attached to all gql requests in a `Authorization` header
            localStorage.setItem(TOKEN, result.loginWithGoogle.token);

            setLoading(false);
            setUser(result.loginWithGoogle.user);
        },
        onError: () => {
            setLoading(false);
            localStorage.removeItem(TOKEN);
        },
    });

    useEffect(() => {
        const id_token = localStorage.getItem(TOKEN);

        if (id_token && !user) {
            login({ variables: { input: { id_token } } });
        } else {
            setLoading(false);
        }
    }, []);

    // validate the token on the backend
    const onLoggedInWithGoogle = (
        response: GoogleLoginResponse | GoogleLoginResponseOffline,
    ) => {
        if ('tokenId' in response) {
            login({ variables: { input: { id_token: response.tokenId } } });
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(TOKEN);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Brand>
                            <Link href="/" passHref>
                                <Typography variant="h6">WTF2Cook</Typography>
                            </Link>
                        </Brand>

                        <div style={{ flexGrow: 1 }} />

                        <SearchBar user={user} />

                        <div style={{ flexGrow: 1 }} />

                        {loading ? null : user ? (
                            <UserMenu user={user} logout={logout} />
                        ) : (
                            <GoogleLogin
                                clientId={GOOGLE_CLIENT_ID}
                                theme="dark"
                                onFailure={(error) => console.log(error)}
                                onSuccess={onLoggedInWithGoogle}
                            />
                        )}
                    </Toolbar>
                </AppBar>
                <Filler style={{ marginBottom: 8 }} />
            </Box>
        </>
    );
};

export default NavBar;
