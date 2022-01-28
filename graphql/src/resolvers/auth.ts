import { ApolloError } from 'apollo-server-errors';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { USER_TABLE } from '../globals';
import { dynamoDB } from '../library/dynamodb';
import { LoginWithGoogleInput, LoginWithGoogleResponse } from '../schema/auth';
import { User } from '../schema/user';
import { Context } from '../types/graphql.types';

/** Globals */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const WTF_TOKEN_KEY = process.env.WTF_TOKEN_KEY as string;

@Resolver()
export class LoginWithGoogleResolver {
    @Mutation(() => LoginWithGoogleResponse)
    async loginWithGoogle(
        @Arg('input') input: LoginWithGoogleInput,
        @Ctx() context: Context,
    ): Promise<LoginWithGoogleResponse> {
        // check if they are already logged in
        if (context.user && context.token) {
            return {
                user: context.user,
                token: context.token,
            };
        }

        // check google id token
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);

        let ticket: LoginTicket;
        try {
            ticket = await client.verifyIdToken({
                idToken: input.id_token,
                audience: GOOGLE_CLIENT_ID,
            });
        } catch (error) {
            throw new ApolloError('failed to verify token');
        }

        const { email, name, picture } = ticket.getPayload() || {};

        if (!email || !name) {
            throw new ApolloError('email or name is missing from auth token');
        }

        // create or update the user
        const user = await dynamoDB.put<User>({
            TableName: USER_TABLE,
            Item: {
                email,
                name,
                picture: picture || null,
            },
        });

        // generate jwt for authentication
        const token = jwt.sign(
            { id: user.id, email, name, picture },
            WTF_TOKEN_KEY,
        );

        return {
            token,
            user,
        };
    }
}
