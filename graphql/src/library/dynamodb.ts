/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { customAlphabet } from 'nanoid';

/** Globals */
const SOURCE = 'DynamoDB';

// create nanid with custom alphabet and size
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 12);

// create a DynamoDB document client
const client = new DocumentClient();

export const dynamoDB = {
    // queries
    get,

    query: (params: DocumentClient.QueryInput) =>
        client.query(params).promise(),

    scan,

    // mutations
    put,

    update: (params: DocumentClient.UpdateItemInput) =>
        client.update(params).promise(),

    delete: (params: DocumentClient.DeleteItemInput) =>
        client.delete(params).promise(),
};

async function put<Entity>(
    params: DocumentClient.PutItemInput,
): Promise<Entity> {
    const now = new Date();

    // set id, created_at, and updated_at
    const entity = {
        ...params.Item,
        id: nanoid(),
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
    };

    await client
        .put({
            ...params,
            Item: entity,
        })
        .promise();

    return entity as unknown as Entity;
}

async function get<Entity>(
    params: DocumentClient.GetItemInput,
): Promise<Entity> {
    const response = await client.get(params).promise();

    if (!response.Item) {
        throw new Error(
            `${SOURCE} - failed to get item: ${params.Key.id} from ${params.TableName}`,
        );
    }

    const entity = {
        ...response.Item,

        // Convert ISO string to date object
        created_at: new Date(response.Item.created_at),
        updated_at: new Date(response.Item.updatedf_at),
    };

    return entity as unknown as Entity;
}

async function scan<Entity>(
    params: DocumentClient.ScanInput,
): Promise<{ entities: Entity[]; cursor: string | null }> {
    const response = await client.scan(params).promise();

    if (!response.Items) {
        throw new Error(
            `${SOURCE} - failed to scan items from ${params.TableName}`,
        );
    }

    const entities = response.Items.map((item) => ({
        ...item,
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at),
    })) as unknown as Entity[];

    return {
        entities,
        cursor: response.LastEvaluatedKey ? response.LastEvaluatedKey.id : null,
    };
}
