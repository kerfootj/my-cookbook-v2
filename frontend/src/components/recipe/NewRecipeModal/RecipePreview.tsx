import { ReactElement } from 'react';
import styled from 'styled-components';
import { Recipe } from '../../../types/recipe.type';
import { RecipeDetails } from '../RecipeDetails';

/** types */
interface RecipePreviewProps {
    recipe: Recipe;
}

/** styles */
const PreviewWindow = styled.div`
    max-height: 400px;
    overflow: scroll;
`;

export function RecipePreview(props: RecipePreviewProps): ReactElement {
    const { recipe } = props;
    return (
        <PreviewWindow>
            <RecipeDetails recipe={recipe} />
        </PreviewWindow>
    );
}
