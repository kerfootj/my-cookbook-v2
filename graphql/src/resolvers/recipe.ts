import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { dynamoDB } from '../library/dynamodb';
import { Recipe, RecipeInput, RecipesResponse } from '../schema/recipe';

const RECIPE_TABLE = process.env.RecipeDB || 'dev-recipes';

@Resolver((of) => Recipe)
export class RecipeResolver {
    @Query((returns) => Recipe)
    async recipe(@Arg('id', (type) => ID) id: string): Promise<Recipe> {
        console.log(id);

        return await dynamoDB.get<Recipe>({
            TableName: RECIPE_TABLE,
            Key: { id },
        });
    }

    @Query((returns) => RecipesResponse)
    async recipes(): Promise<{
        recipes: Recipe[];
        cursor: string | null;
    }> {
        const { entities, cursor } = await dynamoDB.scan<Recipe>({
            TableName: RECIPE_TABLE,
        });

        return {
            recipes: entities,
            cursor,
        };
    }

    @Mutation((returns) => Recipe)
    async createRecipe(@Arg('input') input: RecipeInput): Promise<Recipe> {
        return await dynamoDB.put<Recipe>({
            TableName: RECIPE_TABLE,
            Item: input,
        });
    }
}
