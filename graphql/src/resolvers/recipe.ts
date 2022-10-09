import { ApolloError } from 'apollo-server-errors';
import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { RECIPE_TABLE } from '../globals';
import { dynamoDB } from '../library/dynamodb';
import { Recipe, CreateRecipeInput, RecipesResponse } from '../schema/recipe';
import { Context } from '../types/graphql.types';

@Resolver()
export class RecipeResolver {
    @Query(() => Recipe)
    async recipe(@Arg('id', () => ID) id: string): Promise<Recipe> {
        return await dynamoDB.get<Recipe>({
            TableName: RECIPE_TABLE,
            Key: { id },
        });
    }

    @Query(() => RecipesResponse)
    async recipes(): Promise<RecipesResponse> {
        const { entities, cursor } = await dynamoDB.scan<Recipe>({
            TableName: RECIPE_TABLE,
        });

        return {
            recipes: entities.sort(() => Math.random() - 0.5),
            cursor,
        };
    }

    @Mutation(() => Recipe)
    async createRecipe(
        @Arg('input') input: CreateRecipeInput,
        @Ctx() context: Context,
    ): Promise<Recipe> {
        if (!context.user || context.user.id !== input.user_id) {
            throw new ApolloError('Unauthorized', '401', {
                ctx: context.user,
                input,
            });
        }

        return await dynamoDB.create<Recipe>({
            TableName: RECIPE_TABLE,
            Item: input,
        });
    }
}
