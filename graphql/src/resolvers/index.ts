import { BuildSchemaOptions } from 'type-graphql';
import { RecipeResolver } from './recipe';
import { UserResolver } from './user';

export const resolvers: BuildSchemaOptions['resolvers'] = [
    RecipeResolver,
    UserResolver,
];
