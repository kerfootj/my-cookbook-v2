/** Globals */
const IMGUR_CLIENT_ID = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID as string;

export async function uploadToImgur(base64: string): Promise<string> {
    // set auth headers
    const headers = new Headers();
    headers.append('Authorization', `Client-ID ${IMGUR_CLIENT_ID}`);

    // build body
    const body = new FormData();
    const data = base64.substring(base64.indexOf(',') + 1); // strip prefix
    body.append('image', data);

    // upload to imgur
    const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers,
        body,
    });

    // get image id
    const result = await response.json();
    const image_id = result.data.id;

    // return direct link
    return `https://i.imgur.com/${image_id}.jpg`;
}
