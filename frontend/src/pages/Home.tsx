import { useQuery } from '@apollo/client';
import React, { ReactElement } from 'react';
import { recipesQuery } from '../queries/recipe';

export function Home(props: any): ReactElement {
    const { loading, error, data } = useQuery(recipesQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.recipes.recipes.map((recipe: any) => (
        <div>
            <h2>{recipe.name}</h2>
            <h4>{recipe.description}</h4>
        </div>
    ));
}
