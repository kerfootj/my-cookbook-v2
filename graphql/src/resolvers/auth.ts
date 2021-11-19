import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { dynamoDB } from '../library/dynamodb';
import { LoginWithGoogleInput, LoginWithGoogleResponse } from '../schema/auth';
import { User } from '../schema/user';

/** Globals */
const USER_TABLE = process.env.UserDB || 'dev-users';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;

@Resolver()
export class LoginWithGoogleResolver {
    @Mutation(() => LoginWithGoogleResponse)
    async loginWithGoogle(
        @Arg('input') input: LoginWithGoogleInput,
    ): Promise<LoginWithGoogleResponse> {
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);

        let jwt: LoginTicket;
        try {
            jwt = await client.verifyIdToken({
                idToken: input.id_token,
                audience: GOOGLE_CLIENT_ID,
            });
        } catch (error) {
            return {
                token: 'failed to verify id token',
                user: {
                    email: '',
                    id: '',
                    name: '',
                    picture: null,
                },
            };
        }

        const { email, name, picture } = jwt.getPayload() || {};

        if (!email || !name) {
            return {
                token: 'missing email or name',
                user: {
                    email: `${email}`,
                    id: '',
                    name: `${name}`,
                    picture: null,
                },
            };
        }

        const user = await dynamoDB.put<User>({
            TableName: USER_TABLE,
            Item: {
                email,
                name,
                picture: picture || null,
            },
        });

        return {
            token: input.id_token,
            user,
        };
    }
}
