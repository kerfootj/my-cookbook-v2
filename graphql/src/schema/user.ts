import { Field, ObjectType, ID, InputType } from 'type-graphql';
import { withDefaults } from './common';

@ObjectType()
export class User extends withDefaults() {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => String, { nullable: true })
    picture: string | null;
}

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    name: string;

    @Field()
    email: string;
}
