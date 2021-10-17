import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { recipeQuery } from '../../../queries/recipe';
import { Recipe } from '../../../types/recipe.type';

/** Interfaces */
interface SpacerProps {
    multiplier?: number;
}

interface ListProps {
    type: 'decimal' | 'disc';
}

/** Styled Components */
const RecipeContainer = styled.div`
    padding: 0px;
    margin: 20px auto;
    font-size: 15px;
    line-height: 1.6em;
    color: #2c2c30;
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
    max-width: 180px;
    max-width: 180px;
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

const IngredientsGroup = styled.div`
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
 * Recipe Page Component
 */
const RecipePage = (): ReactElement => {
    const router = useRouter();
    const { id } = router.query;

    const { loading, error, data } = useQuery(recipeQuery, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { name, description, photo_url, servings, notes } = data.recipe;

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

                <RecipeTime recipe={data.recipe} />
            </MetaDataContainer>

            <Spacer multiplier={2} />

            {description && <Description>{description}</Description>}

            <Spacer />

            <ContentContainer>
                <Subtitle>Ingredients</Subtitle>
                <Ingredients recipe={data.recipe} />
            </ContentContainer>

            <Spacer />

            <ContentContainer>
                <Subtitle>Instructions</Subtitle>
                <Instructions recipe={data.recipe} />
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
};

export default RecipePage;

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

            {time_cook && (
                <Time>
                    <span>cook time: </span>
                    <span>{formatTime(time_cook)}</span>
                </Time>
            )}

            {time_chill && (
                <Time>
                    <span>chilling time: </span>
                    <span>{formatTime(time_chill)}</span>
                </Time>
            )}

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
        <IngredientsGroup>
            {title && <Caption>{title}</Caption>}
            <List type="disc">
                {ingredients.map((ingredient) => (
                    <ListItem key={ingredient}>{ingredient}</ListItem>
                ))}
            </List>
        </IngredientsGroup>
    );
}

function Instructions({ recipe }: { recipe: Recipe }): ReactElement {
    const { instructions } = recipe;

    return (
        <List type="decimal">
            {instructions.map((instruction, index) => (
                <ListItem key={`step-${index + 1}`} >{instruction}</ListItem>
            ))}
        </List>
    );
}