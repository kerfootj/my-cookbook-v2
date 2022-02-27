import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';
import GoogleLogin, {
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';
import Link from 'next/link';
import styled from 'styled-components';
import { User } from '../types/user.type';
import { UserMenu } from './user/UserMenu';
import SearchBar from './SearchBar';

/** Types */
interface NavBarProps {
    user: User | null;
    loading_auth: boolean;
    login: (token_id: string) => void;
    logout: () => void;
}

/** Globals */
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

/** Styles */
const Brand = styled.div`
    cursor: pointer;
`;

const Filler = styled(Toolbar)``;

const NavBar: React.FC<NavBarProps> = (props) => {
    const { user, loading_auth, login, logout } = props;

    // validate the token on the backend
    const onLoggedInWithGoogle = (
        response: GoogleLoginResponse | GoogleLoginResponseOffline,
    ) => {
        if ('tokenId' in response) {
            login(response.tokenId);
        }
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

                        {loading_auth ? null : user ? (
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
