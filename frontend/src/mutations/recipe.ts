import { gql } from '@apollo/client';

export const createRecipe = gql`
    mutation CreateRecipe($input: CreateRecipeInput!) {
        createRecipe(input: $input) {
            id
            photo_url
        }
    }
`;
