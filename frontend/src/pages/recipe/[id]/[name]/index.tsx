import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { ReactElement } from 'react';
import Loading from '../../../../components/Loading';
import { Meta } from '../../../../components/Meta';
import { RecipeDetails } from '../../../../components/recipe/RecipeDetails';
import { recipeQuery } from '../../../../queries/recipe';

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

    const { recipe } = data;

    return (
        <>
            <Meta title={recipe.name} />
            <RecipeDetails recipe={recipe} />
        </>
    );
};

export default RecipePage;
