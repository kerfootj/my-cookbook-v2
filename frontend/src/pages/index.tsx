import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import { ReactElement } from 'react';
import { PageComponent } from '../components/pageComponent';
import { RecipeCard } from '../components/recipe/recipeCard';
import { recipesQuery } from '../queries/recipe';
import { Recipe } from '../types/recipe.type';

const Home = (): ReactElement => {
    const { loading, error, data } =
        useQuery<{ recipes: { recipes: Recipe[] } }>(recipesQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const recipes = data?.recipes?.recipes || [];

    return (
        <PageComponent meta={{}}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid container item xs={11} lg={10} xl={8} spacing={1}>
                    {recipes.map((recipe: Recipe) => (
                        <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
                            <RecipeCard recipe={recipe} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </PageComponent>
    );
};

export default Home;
