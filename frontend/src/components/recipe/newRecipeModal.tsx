/* eslint-disable react/no-array-index-key */
import {
    AddBox,
    AddCircleOutline,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    RemoveCircleOutline,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    IconButton,
    LinearProgress,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { SxProps } from '@mui/system';
import React, { ReactElement, useState } from 'react';
import { Ingredients, Recipe } from '../../types/recipe.type';

/** Types */
interface Step1Props {
    setName: (name: string) => void;
    setDescription: (description: string) => void;
}

interface Step2Props {
    ingredients: Recipe['ingredients'];
    setIngredients: (ingredients: Recipe['ingredients']) => void;
}

interface Step3Props {
    instructions: Recipe['instructions'];
    setInstructions: (instructions: Recipe['instructions']) => void;
}

/** Globals */
const TOTAL_STEPS = 4;

/** Styles */
const box_style: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000000b0',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};

const container: SxProps = {
    display: 'flex',
    flexDirection: 'row',
    pt: 2,
    alignItems: 'center',
};

const filler = { flex: '1 1 auto' };

const small = { fontSize: 'small' };

export const NewRecipeModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    // recipe data
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<Recipe['ingredients']>([
        {} as Ingredients,
    ]);
    const [instructions, setInstructions] = useState<Recipe['instructions']>(
        [],
    );

    const handleClose = () => {
        setName(null);
        setDescription(null);
        setIngredients([{} as Ingredients]);
        setStep(1);
        setOpen(false);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    return (
        <>
            <IconButton
                sx={{ p: '10px' }}
                aria-label="new recipes"
                onClick={() => setOpen(true)}
            >
                <AddBox />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={box_style}>
                    <Typography variant="h6">
                        {step === 1 && 'Submit a New Recipe'}
                        {step === 2 && 'Ingredients'}
                        {step === 3 && 'Instructions'}
                    </Typography>
                    <Divider sx={{ marginTop: 1 }} />
                    <Box component="form">
                        {step === 1 && (
                            <Step1
                                setName={setName}
                                setDescription={setDescription}
                            />
                        )}
                        {step === 2 && (
                            <Step2
                                ingredients={ingredients}
                                setIngredients={setIngredients}
                            />
                        )}
                        {step === 3 && (
                            <Step3
                                instructions={instructions}
                                setInstructions={setInstructions}
                            />
                        )}
                    </Box>
                    <Divider />
                    <Box sx={container}>
                        <Button
                            onClick={handleBack}
                            disabled={step === 1}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={filler}>
                            <LinearProgress
                                variant="determinate"
                                value={((step - 1) / TOTAL_STEPS) * 100}
                            />
                        </Box>
                        <Button onClick={handleNext} sx={{ ml: 1 }}>
                            Next
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

/**
 * Name and Description
 */
function Step1(props: Step1Props): ReactElement {
    const { setName, setDescription } = props;
    return (
        <>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                onChange={(event) => setName(event.target.value)}
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                maxRows={4}
                onChange={(event) => setDescription(event.target.value)}
            />
        </>
    );
}

/**
 * Ingredients
 */
function Step2(props: Step2Props): ReactElement {
    const { ingredients, setIngredients } = props;

    // manage tab state
    const [totalSections, setTotalSections] = useState(1);
    const [currentSection, setCurrentSection] = useState(1);

    // add section
    const addSection = () => {
        const updated_ingredients = [...ingredients];
        updated_ingredients.splice(currentSection, 0, {} as Ingredients);

        setIngredients(updated_ingredients);
        setTotalSections(totalSections + 1);
        setCurrentSection(currentSection + 1);
    };

    // remove section
    const removeSection = () => {
        const updated_ingredients = [...ingredients];
        updated_ingredients.splice(currentSection - 1, 1);

        setIngredients(updated_ingredients);
        setTotalSections(totalSections - 1);
        setCurrentSection(currentSection - 1);
    };

    // manage state of ingredients
    const handleIngredientChange = (input: {
        title?: string;
        list?: string;
    }): void => {
        const { title, list } = input;

        const updated_ingredients = [...ingredients];

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

/**
 * Instructions
 */
function Step3(props: Step3Props): ReactElement {
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
