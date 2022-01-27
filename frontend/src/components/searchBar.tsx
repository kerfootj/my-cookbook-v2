import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import React from 'react';
import { User } from '../types/user.type';
import { NewRecipeModal } from './recipe/NewRecipeModal';

/** Types */
interface SearchBarProps {
    user: User | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ user }) => {
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Recipes"
                inputProps={{ 'aria-label': 'search recipes' }}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <Search />
            </IconButton>

            {user && (
                <>
                    <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                    />
                    <NewRecipeModal />
                </>
            )}
        </Paper>
    );
};

export default SearchBar;
