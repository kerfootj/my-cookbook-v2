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
interface IngredientsProps {
    ingredients: R.Ingredients[];
    setIngredients: (ingredients: R.Ingredients[]) => void;
}

export function Ingredients(props: IngredientsProps): ReactElement {
    const { ingredients, setIngredients } = props;

    // manage tab state
    const [totalSections, setTotalSections] = useState(
        Math.max(ingredients.length, 1),
    );
    const [currentSection, setCurrentSection] = useState(1);

    // add section
    const addSection = () => {
        const updated_ingredients = [...ingredients];
        updated_ingredients.splice(currentSection, 0, {} as R.Ingredients);

        setIngredients(updated_ingredients);
        setTotalSections(totalSections + 1);
        setCurrentSection(currentSection + 1);
    };

    // remove section
    const removeSection = () => {
        const updated_ingredients = [...ingredients];
        updated_ingredients.splice(currentSection - 1, 1);

        setIngredients(updated_ingredients);
        setTotalSections(totalSections - 1 || 1);
        setCurrentSection(currentSection - 1 || 1);
    };

    // manage state of ingredients
    const handleIngredientChange = (input: {
        title?: string;
        list?: string;
    }): void => {
        const { title, list } = input;

        const updated_ingredients = [...ingredients];

        if (!updated_ingredients[currentSection - 1]) {
            updated_ingredients[currentSection - 1] = {} as R.Ingredients;
        }

        if (title !== undefined) {
            updated_ingredients[currentSection - 1].title = title;
        }

        if (list !== undefined) {
            updated_ingredients[currentSection - 1].ingredients =
                list.split(/\r?\n/);
        }

        setIngredients(updated_ingredients);
    };

    return (
        <>
            <TextField
                label="Header"
                placeholder="For the ..."
                fullWidth
                margin="normal"
                value={ingredients[currentSection - 1]?.title || ''}
                onChange={(event) =>
                    handleIngredientChange({ title: event.target.value })
                }
            />
            <TextField
                label="Ingredients"
                placeholder="1 ingredient per line"
                fullWidth
                margin="normal"
                multiline
                rows={6}
                value={
                    ingredients[currentSection - 1]?.ingredients?.join('\n') ||
                    ''
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
