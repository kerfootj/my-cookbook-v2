import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserInput } from '../schema/user';

@Resolver(() => User)
export class UserResolver {
    private users: Record<string, User> = {};

    @Query(() => [User])
    async getUser(@Arg('id') id: string): Promise<User> {
        return await this.users[id];
    }
}
