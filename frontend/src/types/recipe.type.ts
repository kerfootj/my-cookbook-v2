export interface Recipe {
    id: string;

    name: string;
    description?: string;
    photo_url?: string;

    servings: number;

    time_prep: number; // mins
    time_cook?: number; // mins
    time_chill?: number; // mins
    time_total: number; // mins

    ingredients: Ingredients[];
    instructions: string[];

    notes?: string;
}

interface Ingredients {
    title: string;
    ingredients: string[];
}
