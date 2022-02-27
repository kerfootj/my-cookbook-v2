import { Paper } from '@mui/material';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { Recipe } from '../../types/recipe.type';

/** Interfaces */
interface RecipeDetailsProps {
    recipe: Recipe;
}

interface SpacerProps {
    multiplier?: number;
}

interface ListProps {
    type: 'decimal' | 'disc';
}

/** Styled Components */
const RecipeContainer = styled(Paper)`
    padding: 24px;
    margin: 16px auto;
    font-size: 15px;
    line-height: 1.6em;
    max-width: 800px;
`;

const Spacer = styled.div<SpacerProps>`
    height: ${(props) =>
        props.multiplier ? `${8 * props.multiplier}px` : `8px`};
`;

const ImageContainer = styled.div`
    float: right;
    margin: 0 0 10px 10px;
    text-align: center;
    position: relative;
    z-index: 1;
`;

const Image = styled.img`
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 50%;
`;

const Title = styled.h2`
    font-family: 'Raleway', Arial, helvetica, sans-serif;
    margin: 0px 0 8px;
    font-weight: 600;
    font-size: 36px;
`;

const Subtitle = styled.div`
    font-family: 'Raleway', Arial, helvetica, sans-serif;
    font-weight: 600;
    margin: 20px 0 10px;
    font-size: 28px;
`;

const Caption = styled.h4`
    font-family: 'Raleway', Arial, helvetica, sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 20px 0 10px;
    font-size: 15px;
`;

const MetaDataContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
`;

const TimesContainer = styled.div`
    margin-left: 1.4em;
    display: inline;
`;

const Time = styled.div`
    display: inline-block;
    margin-right: 1.4em;
`;

const Description = styled.div`
    font-style: italic;
`;

const ContentContainer = styled.div`
    font-weight: 400;
    font-style: normal;
    text-transform: none;
`;

const List = styled.ul<ListProps>`
    list-style-type: ${(props) => props.type};
    margin: 0px;
    padding: 0px;
`;

const ListGroup = styled.div`
    font-family: 'Bitter', Georgia, sans-serif;
`;

const ListItem = styled.li`
    font-family: 'Bitter', Georgia, sans-serif;
    position: relative;
    margin: 0 0 0 32px;
    padding: 0;
    list-style-position: outside;
`;

/**
 * Recipe Details
 */
export function RecipeDetails({ recipe }: RecipeDetailsProps): ReactElement {
    const { name, description, photo_url, servings, notes } = recipe;

    return (
        <RecipeContainer>
            {photo_url && (
                <ImageContainer>
                    <Image src={photo_url} alt={name} />
                    <Spacer />
                </ImageContainer>
            )}

            <Title>{name}</Title>
            <Spacer />

            <MetaDataContainer>
                <span>servings: </span>
                <span>{servings}</span>

                <RecipeTime recipe={recipe} />
            </MetaDataContainer>

            <Spacer multiplier={2} />

            {description && <Description>{description}</Description>}

            <Spacer />

            <ContentContainer>
                <Subtitle>Ingredients</Subtitle>
                <Ingredients recipe={recipe} />
            </ContentContainer>

            <Spacer />

            <ContentContainer>
                <Subtitle>Instructions</Subtitle>
                <Instructions recipe={recipe} />
            </ContentContainer>

            {notes && (
                <>
                    <Spacer />

                    <ContentContainer>
                        <Subtitle>Notes</Subtitle>
                        {notes}
                    </ContentContainer>
                </>
            )}
        </RecipeContainer>
    );
}

function RecipeTime({ recipe }: { recipe: Recipe }): ReactElement {
    const { time_prep, time_total, time_chill, time_cook } = recipe;

    const formatTime = (time: number): string => {
        const hrs = Math.floor(time / 60);
        const mins = time % 60;

        const formatted_time: string[] = [];

        if (hrs) {
            formatted_time.push(`${hrs} hr${hrs > 1 ? 's' : ''}`);
        }

        if (mins) {
            formatted_time.push(`${mins} min${mins > 1 ? 's' : ''}`);
        }

        return formatted_time.join(' ');
    };

    return (
        <TimesContainer>
            <Time>
                <span>prep time: </span>
                <span>{formatTime(time_prep)}</span>
            </Time>

            {(time_cook && (
                <Time>
                    <span>cook time: </span>
                    <span>{formatTime(time_cook)}</span>
                </Time>
            )) ||
                undefined}

            {(time_chill && (
                <Time>
                    <span>chilling time: </span>
                    <span>{formatTime(time_chill)}</span>
                </Time>
            )) ||
                undefined}

            <Time>
                <span>total time: </span>
                <span>{formatTime(time_total)}</span>
            </Time>
        </TimesContainer>
    );
}

function Ingredients({ recipe }: { recipe: Recipe }): ReactElement {
    return (
        <>
            {recipe.ingredients.map(({ ingredients, title }) =>
                IngredientsList({ ingredients, title }),
            )}
        </>
    );
}

function IngredientsList({
    ingredients,
    title,
}: {
    ingredients: string[];
    title: string | null;
}): ReactElement {
    return (
        <ListGroup>
            {title && <Caption>{title}</Caption>}
            <List type="disc">
                {ingredients.map((ingredient) => (
                    <ListItem key={ingredient}>{ingredient}</ListItem>
                ))}
            </List>
        </ListGroup>
    );
}

function Instructions({ recipe }: { recipe: Recipe }): ReactElement {
    return (
        <>
            {recipe.instructions.map(({ instructions, title }) =>
                InstructionsList({ instructions, title }),
            )}
        </>
    );
}

function InstructionsList({
    instructions,
    title,
}: {
    instructions: string[];
    title: string | null;
}): ReactElement {
    return (
        <ListGroup>
            {title && <Caption>{title}</Caption>}
            <List type="decimal">
                {instructions.map((instruction) => (
                    <ListItem key={instruction}>{instruction}</ListItem>
                ))}
            </List>
        </ListGroup>
    );
}
