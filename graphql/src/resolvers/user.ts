import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserInput } from '../schema/user';

@Resolver(() => User)
export class UserResolver {
    private users: Record<string, User> = {};

    @Query(() => [User])
    async getUser(@Arg('id') id: string): Promise<User> {
        return await this.users[id];
    }

    @Mutation(() => User)
    async createUser(@Arg('input') input: UserInput): Promise<User> {
        const { name, email } = input;

        const id = Math.random().toString();

        const user = {
            id,
            name,
            email,
            picture: null,
        };

        this.users[id] = user;

        return user;
    }
}
