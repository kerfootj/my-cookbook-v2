import { BuildSchemaOptions } from 'type-graphql';
import { LoginWithGoogleResolver } from './auth';
import { RecipeResolver } from './recipe';
import { UserResolver } from './user';

export const resolvers: BuildSchemaOptions['resolvers'] = [
    LoginWithGoogleResolver,
    RecipeResolver,
    UserResolver,
];
