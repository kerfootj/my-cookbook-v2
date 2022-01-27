import { useQuery } from '@apollo/client';
import { Paper } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { ReactElement } from 'react';
import styled from 'styled-components';
import Loading from '../../../../components/Loading';
import { RecipeDetails } from '../../../../components/recipe/RecipeDetails';
import { recipeQuery } from '../../../../queries/recipe';
import { Recipe } from '../../../../types/recipe.type';

/** Interfaces */
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

    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    return <RecipeDetails recipe={data.recipe} />;
};

export default RecipePage;
