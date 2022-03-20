import { AccountCircle } from '@mui/icons-material';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../../types/user.type';
import { NewRecipeModal } from '../recipe/NewRecipeModal';

/** Types */
interface UserMenuProps {
    user: User;
    logout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = (props) => {
    const { user, logout } = props;

    const [open_new_recipe, setOpenNewRecipe] = useState(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
    };

    return (
        <>
            {user.picture ? (
                <Avatar
                    alt={user.name}
                    src={user.picture}
                    sx={{ width: 40, height: 40 }}
                    imgProps={{ referrerPolicy: 'no-referrer' }}
                    onClick={handleMenu}
                    style={{ cursor: 'pointer' }}
                />
            ) : (
                <IconButton onClick={handleMenu}>
                    <AccountCircle />
                </IconButton>
            )}
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <NewRecipeModal
                user={user}
                open={open_new_recipe}
                onClose={() => setOpenNewRecipe(false)}
            />
        </>
    );
};
