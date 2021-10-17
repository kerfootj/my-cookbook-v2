import Head from 'next/head';
import { ReactElement } from 'react';

export interface MetaProps {
    title?: string;
    description?: string;
    image?: string;
}

const DEFAULT_TITLE = 'WTF 2 Cook';
const DEFAULT_DESCRIPTION = 'Visit wtf2cook.ca for the best no bs recipes';
const DEFAULT_IMAGE = 'TODO';

export function Meta(props: MetaProps): ReactElement {
    const { title, description, image } = props;

    return (
        <Head>
            <title>{title || DEFAULT_TITLE}</title>
            <meta
                name="description"
                content={description || DEFAULT_DESCRIPTION}
            />

            <meta property="og:title" content={title || DEFAULT_TITLE} />
            <meta
                property="og:description"
                content={description || DEFAULT_DESCRIPTION}
            />
            <meta property="og:image" content={image || DEFAULT_IMAGE} />
            <meta property="og:type" content="website" />

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta charSet="utf-8" />
        </Head>
    );
}
