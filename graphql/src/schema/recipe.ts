import { Field, ObjectType, InputType, ID } from 'type-graphql';
import { withDefaults } from './common';

@ObjectType({ isAbstract: true })
class Ingredients {
    @Field((type) => String, { nullable: true })
    title: string;

    @Field((type) => [String])
    ingredients: string[];
}

@ObjectType({ isAbstract: true })
class Instructions {
    @Field((type) => String, { nullable: true })
    title: string | null;

    @Field((type) => [String])
    instructions: string[];
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

    @Field((type) => String, { nullable: true })
    notes: string | null;

    @Field(() => ID)
    user_id: string;
}
@ObjectType()
export class Recipe extends withDefaults(RecipeBase) {
    @Field((type) => [Ingredients])
    ingredients: Ingredients[];

    @Field((type) => [Instructions])
    instructions: Instructions[];
}

@InputType()
class IngredientsInput {
    @Field((type) => String, { nullable: true })
    title: string | null;

    @Field((type) => [String])
    ingredients: string[];
}

@InputType()
class InstructionsInput {
    @Field((type) => String, { nullable: true })
    title: string | null;

    @Field((type) => [String])
    instructions: string[];
}

@InputType()
export class CreateRecipeInput extends RecipeBase {
    @Field((type) => [IngredientsInput])
    ingredients: IngredientsInput[];

    @Field((type) => [InstructionsInput])
    instructions: InstructionsInput[];
}

@ObjectType()
export class RecipesResponse {
    @Field((type) => [Recipe])
    recipes: Recipe[];

    @Field((type) => String, { nullable: true })
    cursor: string | null;
}
