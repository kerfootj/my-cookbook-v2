/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { customAlphabet } from 'nanoid';

/** Globals */
const SOURCE = 'DynamoDB';

// create nanoid with custom alphabet and size
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 12);

// create a DynamoDB document client
const client = new DocumentClient({
    region: 'us-west-2',
});

export const dynamoDB = {
    // queries
    get,

    query: (params: DocumentClient.QueryInput) =>
        client.query(params).promise(),

    scan,

    // mutations
    createOrUpdate,
    create,
    update,
    delete: (params: DocumentClient.DeleteItemInput) =>
        client.delete(params).promise(),
};

async function createOrUpdate<Entity>(
    params: DocumentClient.PutItemInput,
): Promise<Entity> {
    if (params.Item.id) {
        return await update<Entity>(params);
    }

    return await create<Entity>(params);
}

async function create<Entity>(
    params: DocumentClient.PutItemInput,
): Promise<Entity> {
    const now = new Date();

    // set id, created_at, and updated_at
    const entity = {
        ...params.Item,
        id: nanoid(),
        created_at: now,
        updated_at: now,
    };

    return await put({
        ...params,
        Item: entity,
    });

    return entity as unknown as Entity;
}

async function update<Entity>(
    params: DocumentClient.PutItemInput,
): Promise<Entity> {
    const now = new Date();

    // set updated_at
    const entity = {
        ...params.Item,
        updated_at: now,
    };

    return await put({
        ...params,
        Item: entity,
    });

    return entity as unknown as Entity;
}

async function put<Entity>(
    params: DocumentClient.PutItemInput,
): Promise<Entity> {
    const { Item } = params;
    // convert dates to string
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html
    const entity = {
        ...Item,
        created_at: Item.created_at.toISOString(),
        updated_at: Item.updated_at.toISOString(),
    };

    await client
        .put({
            ...params,
            Item: entity,
        })
        .promise();

    return Item as Entity;
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
        updated_at: new Date(response.Item.updated_at),
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
