import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import { dynamoDB } from '../library/dynamodb';
import { Recipe, RecipeInput } from '../schema/recipe';

const RECIPE_TABLE = process.env.RecipeDB || 'dev-recipes';

@Resolver((of) => Recipe)
export class RecipeResolver {
    private recipes: Recipe[] = [];

    @Query((returns) => [Recipe])
    async getRecipes(): Promise<Recipe[]> {
        const results = await dynamoDB.scan({
            TableName: RECIPE_TABLE,
        });

        const recipes = (results.Items || []).map(
            (item): Recipe => ({
                id: item.id,
                name: item.name,
                description: item.description,
            }),
        );

        return recipes;
    }

    @Mutation((returns) => Recipe)
    async createRecipe(@Arg('input') input: RecipeInput): Promise<Recipe> {
        const { name, description, photo_url } = input;

        const recipe: Recipe = {
            id: uuidv4(),
            name,
            description,
            photo_url,
        };

        await dynamoDB.put({
            TableName: RECIPE_TABLE,
            Item: recipe,
        });

        return recipe;
    }
}
