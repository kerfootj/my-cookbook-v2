declare module 'passport-token-google' {
    export class Strategy {
        constructor(
            input: { clientID: string; clientSecret: string },
            callback: any,
        );

        authenticate();
    }
}
