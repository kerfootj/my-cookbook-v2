import { Recipe } from './types/recipe.type';

const recipe: Recipe = {
    id: '1',
    name: "Millionaire's Shortbread",
    description:
        'Shortbread, caramel, and chocolate! What else more could you need?',
    photo_url: 'https://i.imgur.com/1ohO5cVh.jpeg',

    servings: 16,

    time_prep: 30,
    time_cook: 60,
    time_chill: 60,
    time_total: 150,

    ingredients: {
        kind: 'detailed',
        parts: [
            {
                title: 'For the Shortbread',
                ingredients: [
                    '50g golden caster sugar',
                    '150g butter',
                    '250g plain flour',
                ],
            },
            {
                title: 'For the Caramel',
                ingredients: [
                    '175g butter',
                    '175g golden caster sugar',
                    '400ml condensed milk',
                ],
            },
            {
                title: 'For the Topping',
                ingredients: ['300g milk or dark chocolate'],
            },
        ],
    },

    instructions: [
        'Preheat oven to 160C (140C if fan oven or gas mark 3). Line the tin with baking paper and ensure it overhangs slightly so it will be easy to remove the shortbread at the end.',
        "For the shortbread layer, place the sugar, butter and flours into a food processor, whiz until a soft dough is made. If you don't have a food processor like myself, I cut the cold butter into small pieces then worked it into the flour and sugar with my fingers until it resembled breadcrumbs. I kneaded the mixture until it resembled a dough and then pressed it firmly into the tin. Stab the shortbread mixture in the tin evenly with a fork.",
        "Bake in the oven for 35 minutes or until golden. Don't worry if it's still a little bit spongy when you pull it out the oven, it hardens upon cooling.",
        'To make the caramel, place the butter, sugar, syrup and condensed milk into a saucepan and stir over a low heat until the butter has melted.',
        'Bubble and stir the mixture gently for five to eight minutes (mine took a little longer than this), until you get a thick caramel coloured and fudge-like mix. Pour over the cold shortbread in an even layer. Leave to cool.',
        'Once the caramel has cooled, chop the chocolate and place in a bowl suspended over a pan of simmering water. Do not let the water touch the bottom of the bowl. Stir the chocolate until melted. Spread evenly over the caramel and allow to set.',
        'When ready to serve remove from the tin using the paper to help and cut into little squares',
    ],

    notes: 'Recipe from Reddit: https://www.reddit.com/r/food/comments/akgnfu/homemade_millionaires_shortbread/',
};

export default recipe;
