import { Field, ObjectType, ID, InputType } from 'type-graphql';

@ObjectType()
export class User {
    @Field((type) => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;
}

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    name: string;

    @Field()
    email: string;
}
