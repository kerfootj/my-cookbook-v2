import { ReactElement } from 'react';
import { Meta } from '../../../../components/Meta';
import { RecipeDetails } from '../../../../components/recipe/RecipeDetails';
import client from '../../../../isr/apollo-client';
import { recipeQuery } from '../../../../queries/recipe';
import { Recipe, RecipeQueryResponse } from '../../../../types/recipe.type';

/** Types */
interface RecipePageProps {
    recipe: Recipe;
}

/**
 * NextJS SSR Props
 */
export async function getServerSideProps({
    params,
}: {
    params: { id: string };
}) {
    const {
        data: { recipe },
    } = await client.query<RecipeQueryResponse>({
        query: recipeQuery,
        variables: { id: params.id },
    });

    return { props: { recipe } };
}

/**
 * Recipe Page Component
 */
export default function RecipePage({ recipe }: RecipePageProps): ReactElement {
    return (
        <>
            <Meta
                title={recipe.name}
                description={recipe.description}
                image={recipe.photo_url}
            />
            <RecipeDetails recipe={recipe} />
        </>
    );
}
