import { TextField } from '@mui/material';
import { ReactElement, ChangeEvent } from 'react';

/** types */
export interface Times {
    prep: number | null;
    cook: number | null;
    chill: number | null;
    total: number | null;
}

interface TimingsProps {
    times: Times;
    setTimes: (times: Times) => void;
}

export function Timings(props: TimingsProps): ReactElement {
    const { times, setTimes } = props;

    const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        let time: number | null = Number.parseInt(value, 10);
        time = typeof time === 'number' && time >= 0 ? time : null;

        setTimes({
            ...times,
            [name]: time,
        });
    };

    return (
        <>
            <TextField
                label="Prep Time"
                name="prep"
                placeholder="in minutes"
                value={typeof times.prep === 'number' ? times.prep : ''}
                onChange={handleTimeChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Cook Time"
                name="cook"
                placeholder="in minutes"
                value={typeof times.cook === 'number' ? times.cook : ''}
                onChange={handleTimeChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Chill Time"
                name="chill"
                placeholder="in minutes"
                value={typeof times.chill === 'number' ? times.chill : ''}
                onChange={handleTimeChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Total Time"
                name="total"
                placeholder="in minutes"
                value={typeof times.total === 'number' ? times.total : ''}
                onChange={handleTimeChange}
                fullWidth
                margin="normal"
            />
        </>
    );
}
