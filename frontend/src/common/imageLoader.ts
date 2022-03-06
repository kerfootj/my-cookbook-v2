interface ImageLoaderInput {
    src: string;
}

/**
 * Retrieve images from the correct directory when deployed to AWS
 */
export function imageLoader() {
    return process.env.NODE_ENV === 'development'
        ? undefined
        : ({ src }: ImageLoaderInput) => `https://wtf2cook.ca${src}`;
}
