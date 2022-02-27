import {
    AddCircleOutline,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    RemoveCircleOutline,
} from '@mui/icons-material';
import { IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement, useState } from 'react';
import * as R from '../../../types/recipe.type';
import { container, filler, small } from './styles';

/** types */
interface InstructionsProps {
    instructions: R.Instructions[];
    setInstructions: (instructions: R.Instructions[]) => void;
}

export function Instructions(props: InstructionsProps): ReactElement {
    const { instructions, setInstructions } = props;

    // manage tab state
    const [totalSections, setTotalSections] = useState(
        Math.max(instructions.length, 1),
    );
    const [currentSection, setCurrentSection] = useState(1);

    // add section
    const addSection = () => {
        const updated_instructions = [...instructions];
        updated_instructions.splice(currentSection, 0, {} as R.Instructions);

        setInstructions(updated_instructions);
        setTotalSections(totalSections + 1);
        setCurrentSection(currentSection + 1);
    };

    // remove section
    const removeSection = () => {
        const updated_instructions = [...instructions];
        updated_instructions.splice(currentSection - 1, 1);

        setInstructions(updated_instructions);
        setTotalSections(totalSections - 1 || 1);
        setCurrentSection(currentSection - 1 || 1);
    };

    // manage state of instructions
    const handleIngredientChange = (input: {
        title?: string;
        list?: string;
    }): void => {
        const { title, list } = input;

        const updated_instructions = [...instructions];

        if (!updated_instructions[currentSection - 1]) {
            updated_instructions[currentSection - 1] = {} as R.Instructions;
        }

        if (title !== undefined) {
            updated_instructions[currentSection - 1].title = title;
        }

        if (list !== undefined) {
            updated_instructions[currentSection - 1].instructions =
                list.split(/\r?\n/);
        }

        setInstructions(updated_instructions);
    };

    return (
        <>
            <TextField
                label="Header"
                placeholder="For the ..."
                fullWidth
                margin="normal"
                value={instructions[currentSection - 1]?.title || ''}
                onChange={(event) =>
                    handleIngredientChange({ title: event.target.value })
                }
            />
            <TextField
                label="Instructions"
                placeholder="1 ingredient per line"
                fullWidth
                margin="normal"
                multiline
                rows={6}
                value={
                    instructions[currentSection - 1]?.instructions?.join(
                        '\n',
                    ) || ''
                }
                onChange={(event) =>
                    handleIngredientChange({ list: event.target.value })
                }
            />
            <Box sx={container}>
                <IconButton
                    onClick={() => setCurrentSection(currentSection - 1)}
                    disabled={currentSection === 1}
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <Box sx={filler} />
                <IconButton
                    onClick={removeSection}
                    disabled={totalSections === 1}
                >
                    <RemoveCircleOutline sx={small} />
                </IconButton>
                <Typography variant="body2">
                    {`Section ${currentSection} / ${totalSections}`}
                </Typography>
                <IconButton onClick={addSection}>
                    <AddCircleOutline sx={small} />
                </IconButton>
                <Box sx={filler} />
                <IconButton
                    onClick={() => setCurrentSection(currentSection + 1)}
                    disabled={currentSection === totalSections}
                >
                    <KeyboardArrowRight />
                </IconButton>
            </Box>
        </>
    );
}
