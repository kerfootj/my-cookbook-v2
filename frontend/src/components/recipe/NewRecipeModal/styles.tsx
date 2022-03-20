import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const box_style = (theme: Theme, step: number): SxProps => {
    const base: SxProps = {
        bgcolor: 'background.paper',
        border: '2px solid #000000b0',
        borderRadius: 2,
        boxShadow: 24,
        p: 2,
    };

    // preview
    if (step === 6) {
        return {
            ...base,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80%',
            height: '90%',
        };
    }

    return {
        ...base,
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -30%)',
        width: 500,
        maxWidth: '96%',
    };
};

export const container: SxProps = {
    display: 'flex',
    flexDirection: 'row',
    pt: 2,
    alignItems: 'center',
};

export const filler = { flex: '1 1 auto' };

export const small = { fontSize: 'small' };
