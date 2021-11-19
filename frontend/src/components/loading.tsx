import { Grid } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import loading from '../../public/loading.gif';

const Loading: React.FC = () => {
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Image src={loading} alt="loading" />
            </Grid>
        </Grid>
    );
};

export default Loading;
