import { Field, ObjectType, InputType } from 'type-graphql';
import { withDefaults } from './common';

@ObjectType({ isAbstract: true })
class Ingredients {
    @Field()
    title: string;

    @Field((type) => [String])
    ingredients: string[];
}

/** Common recipe properties */
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
class RecipeBase {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field((type) => String, { nullable: true })
    photo_url: string | null;

    @Field()
    servings: number;

    @Field()
    time_prep: number;

    @Field((type) => Number, { nullable: true })
    time_cook: number | null;

    @Field((type) => Number, { nullable: true })
    time_chill: number | null;

    @Field()
    time_total: number;

    @Field((type) => [String])
    instructions: string[];

    @Field((type) => String, { nullable: true })
    notes: string | null;
}
@ObjectType()
export class Recipe extends withDefaults(RecipeBase) {
    @Field((type) => [Ingredients])
    ingredients: Ingredients[];
}

@InputType()
class IngredientsInput {
    @Field()
    title: string;

    @Field((type) => [String])
    ingredients: string[];
}

@InputType()
export class RecipeInput extends RecipeBase {
    @Field((type) => [IngredientsInput])
    ingredients: IngredientsInput[];
}

@ObjectType()
export class RecipesResponse {
    @Field((type) => [Recipe])
    recipes: Recipe[];

    @Field((type) => String, { nullable: true })
    cursor: string | null;
}
