import { gql } from '@apollo/client';

export const loginWithGoogle = gql`
    mutation LoginWithGoogle($input: LoginWithGoogleInput!) {
        loginWithGoogle(input: $input) {
            token
            user {
                id
                email
                name
                picture
            }
        }
    }
`;
