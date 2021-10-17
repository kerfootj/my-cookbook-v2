import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import TextTruncate from 'react-text-truncate';
import { Recipe } from '../../types/recipe.type';

const StyledCard = styled(Card)`
    height: 420px;
`;

const CardPhoto = styled(CardMedia)`
    height: 300px;
`;

const CardTitle = styled(Typography)`
    font-weight: 600;
`;

const CardDescription = styled(Typography)`
    font-size: 0.875rem;
`;

export function RecipeCard({ recipe }: { recipe: Recipe }): ReactElement {
    const { id, name, description, photo_url } = recipe;
    return (
        <StyledCard>
            <CardActionArea href={`/recipe/${id}`}>
                <CardPhoto image={photo_url} title={name} />
                <CardContent>
                    <CardTitle variant="h6" gutterBottom>
                        {name}
                    </CardTitle>
                    <CardDescription variant="body1">
                        <TextTruncate
                            line={2}
                            truncateText=" …"
                            text={description}
                        />
                    </CardDescription>
                </CardContent>
            </CardActionArea>
        </StyledCard>
    );
}
