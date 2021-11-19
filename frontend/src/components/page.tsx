import React from 'react';
import { Meta, MetaProps } from './meta';

/** Types */
interface PageComponentProps {
    meta: MetaProps;
}

export const PageComponent: React.FC<PageComponentProps> = ({
    meta,
    children,
}) => {
    return (
        <>
            <Meta
                title={meta.title}
                description={meta.description}
                image={meta.image}
            />
            {children}
        </>
    );
};
