import { Grid } from '@mui/material';
import Image from 'next/image';
import loading from '../../public/images/loading.gif';
import { imageLoader } from '../common/imageLoader';

export default function Loading() {
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <Image src={loading} alt="loading" loader={imageLoader()} />
            </Grid>
        </Grid>
    );
}
