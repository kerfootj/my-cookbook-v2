import { Field, ObjectType, ID, InputType } from 'type-graphql';

@ObjectType()
export class Recipe {
    @Field((type) => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field({ nullable: true })
    photo_url?: string;
}

@InputType()
export class RecipeInput implements Partial<Recipe> {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field({ nullable: true })
    photo_url?: string;
}
