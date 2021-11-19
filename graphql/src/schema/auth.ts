import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { User } from './user';

@InputType()
export class LoginWithGoogleInput {
    @Field(() => ID)
    id_token: string;
}

@ObjectType()
export class LoginWithGoogleResponse {
    @Field(() => ID)
    token: string;

    @Field(() => User)
    user: User;
}
