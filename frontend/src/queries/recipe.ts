import { gql } from '@apollo/client';

export const recipeQuery = gql`
    query Recipe($id: ID!) {
        recipe(id: $id) {
            id
            created_at
            name
            description

            photo_url

            servings
            time_prep
            time_cook
            time_chill
            time_total

            notes

            ingredients {
                title
                ingredients
            }
            instructions
        }
    }
`;

export const recipesQuery = gql`
    query Recipe {
        recipes {
            recipes {
                id
                created_at
                name
                description
                servings
                time_total
            }
        }
    }
`;
