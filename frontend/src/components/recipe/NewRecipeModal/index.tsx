/* eslint-disable react/no-array-index-key */
import { useMutation } from '@apollo/client';
import { AddBox } from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    IconButton,
    LinearProgress,
    Modal,
    Typography,
} from '@mui/material';
import { SxProps } from '@mui/system';
import React, { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { uploadToImgur } from '../../../common/imgur';
import { createRecipe } from '../../../mutations/recipe';
import * as T from '../../../types/recipe.type';
import { AddImage } from './AddImage';
import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';
import { RecipeNameAndDescription } from './NameAndDescription';
import { RecipePreview } from './RecipePreview';
import { container, filler } from './styles';
import { Times, Timings } from './Timings';
import { User } from '../../../types/user.type';
import Loading from '../../Loading';

/** Types */
interface NewRecipeModalProps {
    user: User;
}

/** Globals */
const TOTAL_STEPS = 5;

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

const ErrorMessage = styled(Typography)`
    color: #ff2c2c;
`;

export const NewRecipeModal: React.FC<NewRecipeModalProps> = (props) => {
    const { user } = props;

    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    // recipe data
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [servings, setServings] = useState<number | null>(null);
    const [ingredients, setIngredients] = useState<T.Recipe['ingredients']>([]);
    const [instructions, setInstructions] = useState<T.Recipe['instructions']>(
        [],
    );
    const [times, setTimes] = useState<Times>({
        prep: null,
        chill: null,
        cook: null,
        total: null,
    });
    const [image, setImage] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const resetState = () => {
        setName(null);
        setDescription(null);
        setServings(null);
        setIngredients([{} as T.Ingredients]);
        setInstructions([]);
        setTimes({ prep: null, chill: null, cook: null, total: null });
        setImage(null);

        setError(null);
        setStep(1);
        setOpen(false);
    };

    const [createRecipeMutation, { loading }] = useMutation<
        {
            createRecipe: T.Recipe;
        },
        { input: T.Recipe }
    >(createRecipe, {
        onCompleted: (result) => {
            resetState();
            Router.push(`recipe/${result.createRecipe.id}`);
        },
        onError: () => {
            setError('Oops, something got burnt. Please try again.');
        },
    });

    const handleClose = () => {
        resetState();
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleNext = () => {
        if (step === 1) {
            if (!name) {
                setError(`Please add a recipe name.`);
                return;
            }
            if (!description) {
                setError(`Please add a short description.`);
                return;
            }
            if (!servings) {
                setError(`Please add the number of servings the recipe makes.`);
                return;
            }
        }

        if (step === 2) {
            if (!ingredients.length || !ingredients[0].ingredients?.length) {
                setError(`Looks bland, try adding some ingredients.`);
                return;
            }
        }

        if (step === 3) {
            if (!instructions.length || !instructions[0].instructions?.length) {
                setError(`That's confusing, try adding some instructions.`);
                return;
            }
        }

        if (step === 4) {
            if (!times.prep) {
                setError(`C'mon how long will this really take to prep?`);
                return;
            }
            if (!times.total) {
                setError(`Be honest, how long will this take in total?`);
                return;
            }
        }

        setError(null);
        setStep(step + 1);
    };

    const getRecipeFromState = (): T.Recipe => {
        const recipe = {
            name,
            description,
            photo_url: image,
            ingredients,
            instructions,
            servings,
            time_prep: times.prep,
            time_total: times.total,
            time_chill: times.chill,
            time_cook: times.cook,
        } as T.Recipe;

        return recipe;
    };

    const handleSubmit = async () => {
        // upload image to imgur
        let photo_url: string | undefined;
        if (image) {
            try {
                photo_url = await uploadToImgur(image);
            } catch (_) {
                setError('Sorry, image failed to upload. Please try again.');
            }
        }

        createRecipeMutation({
            variables: {
                input: {
                    ...getRecipeFromState(),
                    photo_url,
                    user_id: user.id,
                },
            },
        });
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
                        {step === 4 && 'Cook Time'}
                        {step === 5 && 'Add a Photo'}
                    </Typography>
                    <Divider sx={{ marginTop: 1 }} />
                    <Box component="form">
                        {step === 1 && (
                            <RecipeNameAndDescription
                                name={name}
                                setName={setName}
                                description={description}
                                setDescription={setDescription}
                                servings={servings}
                                setServings={setServings}
                            />
                        )}
                        {step === 2 && (
                            <Ingredients
                                ingredients={ingredients}
                                setIngredients={setIngredients}
                            />
                        )}
                        {step === 3 && (
                            <Instructions
                                instructions={instructions}
                                setInstructions={setInstructions}
                            />
                        )}
                        {step === 4 && (
                            <Timings times={times} setTimes={setTimes} />
                        )}
                        {step === 5 && (
                            <AddImage image={image} setImage={setImage} />
                        )}
                        {step === 6 && !loading && (
                            <RecipePreview
                                recipe={{
                                    ...getRecipeFromState(),
                                    id: 'new',
                                }}
                            />
                        )}
                        {step === 6 && loading && <Loading />}
                        {error && (
                            <ErrorMessage variant="caption">
                                {error}
                            </ErrorMessage>
                        )}
                    </Box>
                    <Divider />
                    <Box sx={container}>
                        <Button
                            onClick={handleBack}
                            disabled={step === 1 || loading}
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
                        {step === 5 ? (
                            <Button onClick={handleNext} sx={{ ml: 1 }}>
                                Preview
                            </Button>
                        ) : step === 6 ? (
                            <Button
                                onClick={handleSubmit}
                                sx={{ ml: 1 }}
                                disabled={loading}
                            >
                                Submit
                            </Button>
                        ) : (
                            <Button onClick={handleNext} sx={{ ml: 1 }}>
                                Next
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
