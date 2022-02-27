import { RECIPE_TABLE } from '../../globals';
import { dynamoDB } from '../../library/dynamodb';
import { Recipe } from '../../schema/recipe';

async function main(): Promise<void> {
    console.log('process.env.RecipeDB');
    console.log(process.env.RecipeDB);

    console.log('getting recipes...');

    const { entities } = await dynamoDB.scan<Recipe>({
        TableName: RECIPE_TABLE,
    });

    for (const recipe of entities) {
        console.log(`updating: ${recipe.name} ${recipe.id}`);

        const updated_recipe: Recipe = {
            ...recipe,
            instructions: [
                {
                    title: null,
                    instructions: [
                        // convert to new instructions format
                        ...(recipe.ingredients as unknown as string[]),
                    ],
                },
            ],
        };

        await dynamoDB.update({
            TableName: RECIPE_TABLE,
            Item: updated_recipe,
        });
    }
}

main()
    .then(() => console.log('done'))
    .catch((error) => console.log(error));
