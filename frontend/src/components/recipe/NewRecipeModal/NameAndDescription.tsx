import { TextField } from '@mui/material';
import { ReactElement } from 'react';

/** Types */
interface NameAndDescriptionProps {
    name: string | null;
    description: string | null;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    servings: number | null;
    setServings: (num: number | null) => void;
}

export function RecipeNameAndDescription(
    props: NameAndDescriptionProps,
): ReactElement {
    const {
        name,
        setName,
        description,
        setDescription,
        servings,
        setServings,
    } = props;

    return (
        <>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name || ''}
                onChange={(event) => setName(event.target.value)}
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                maxRows={4}
                value={description || ''}
                onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
                label="Servings"
                fullWidth
                margin="normal"
                value={servings || ''}
                onChange={(event) =>
                    setServings(Number.parseInt(event.target.value, 10) || null)
                }
            />
        </>
    );
}
