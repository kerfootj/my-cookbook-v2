import { TextField } from '@mui/material';
import { ReactElement } from 'react';
import { Recipe } from '../../../types/recipe.type';

/** types */
interface InstructionsProps {
    instructions: Recipe['instructions'];
    setInstructions: (instructions: Recipe['instructions']) => void;
}

export function Instructions(props: InstructionsProps): ReactElement {
    const { instructions, setInstructions } = props;

    return (
        <TextField
            label="Instructions"
            placeholder="1 instruction per line"
            fullWidth
            margin="normal"
            multiline
            rows={12}
            value={instructions.join('\n')}
            onChange={(event) =>
                setInstructions(event.target.value.split(/\r?\n/))
            }
        />
    );
}
