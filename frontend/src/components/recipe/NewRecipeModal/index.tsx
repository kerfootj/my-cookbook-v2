import { useMutation } from '@apollo/client';
import {
    Box,
    Button,
    Divider,
    LinearProgress,
    Modal,
    Typography,
    useTheme,
} from '@mui/material';
import Router from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { uploadToImgur } from '../../../common/imgur';
import { createRecipe } from '../../../mutations/recipe';
import * as T from '../../../types/recipe.type';
import { User } from '../../../types/user.type';
import Loading from '../../Loading';
import {
    AddImage,
    Ingredients,
    Instructions,
    RecipeNameAndDescription,
    RecipePreview,
    Times,
    Timings,
} from './RecipeFormSections';
import { box_style, container, filler } from './styles';

/** Types */
interface NewRecipeModalProps {
    user: User;
    recipe?: T.Recipe;
    open: boolean;
    onClose: () => void;
}

/** Globals */
const TOTAL_STEPS = 5;

export const NewRecipeModal: React.FC<NewRecipeModalProps> = (props) => {
    const { user, recipe, open, onClose } = props;

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

    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setDescription(recipe.description || null);
            setImage(recipe.photo_url || null);
            setServings(recipe.servings);
            setIngredients(recipe.ingredients);
            setInstructions(recipe.instructions);
            setTimes({
                chill: recipe.time_chill || null,
                cook: recipe.time_cook || null,
                prep: recipe.time_prep,
                total: recipe.time_total,
            });
        }
    }, [recipe, open]);

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

        onClose();
    };

    const [createRecipeMutation, { loading }] = useMutation<
        {
            createRecipe: T.Recipe;
        },
        { input: T.Recipe }
    >(createRecipe, {
        onCompleted: (result) => {
            resetState();
            Router.push(
                `recipe/${result.createRecipe.id}/${name
                    ?.toLowerCase()
                    .replace(/ /g, '-')}`,
            );
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

    const getRecipeFromState = (): T.Recipe =>
        ({
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
        } as T.Recipe);

    const handleSubmit = async () => {
        // upload image to imgur
        let photo_url: string | undefined;

        if (image && image.startsWith('data:image')) {
            try {
                photo_url = await uploadToImgur(image);
            } catch (_) {
                setError('Sorry, image failed to upload. Please try again.');
                return;
            }
        } else if (image && image.startsWith('https://i.imgur.com')) {
            photo_url = image;
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

    const theme = useTheme();

    const ModalHeader = (): ReactElement | null => {
        return step < 6 ? (
            <>
                <Typography variant="h6">
                    {
                        {
                            1: 'Submit a New Recipe',
                            2: 'Ingredients',
                            3: 'Instructions',
                            4: 'Cook Time',
                            5: 'Add a Photo',
                        }[step]
                    }
                </Typography>
                <Divider sx={{ marginTop: 1 }} />
            </>
        ) : null;
    };

    const BackButton = (): ReactElement =>
        step === 1 ? (
            <Button onClick={handleClose} disabled={loading} sx={{ mr: 1 }}>
                Close
            </Button>
        ) : (
            <Button onClick={handleBack} disabled={loading} sx={{ mr: 1 }}>
                Back
            </Button>
        );

    const NextButton = (): ReactElement =>
        step === 6 ? (
            <Button onClick={handleSubmit} sx={{ ml: 1 }} disabled={loading}>
                Submit
            </Button>
        ) : (
            <Button onClick={handleNext} sx={{ ml: 1 }} disabled={loading}>
                {step === 5 ? 'Preview' : 'Next'}
            </Button>
        );

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={box_style(theme, step)}>
                    <ModalHeader />
                    <Box component="form" sx={{ height: 'inherit' }}>
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
                            <Typography
                                variant="caption"
                                sx={{ color: '#ff2c2c' }}
                            >
                                {error}
                            </Typography>
                        )}
                    </Box>
                    <Divider />
                    <Box sx={container}>
                        <BackButton />
                        <Box sx={filler}>
                            <LinearProgress
                                variant="determinate"
                                value={((step - 1) / TOTAL_STEPS) * 100}
                            />
                        </Box>
                        <NextButton />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
