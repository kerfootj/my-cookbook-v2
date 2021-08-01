import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserInput } from '../schema/user';

@Resolver((of) => User)
export class UserResolver {
    private users: Record<string, User> = {};

    @Query((returns) => [User])
    async getUser(@Arg('id') id: string): Promise<User> {
        return await this.users[id];
    }

    @Mutation((returns) => User)
    async createUser(@Arg('input') input: UserInput): Promise<User> {
        const { name, email } = input;

        const id = Math.random().toString();

        const user = {
            id,
            name,
            email,
        };

        this.users[id] = user;

        return user;
    }
}
