import { Divider, Typography } from 'antd';
import React from 'react';
import { ProductsWall } from 'widgets';

const { Title } = Typography;

export const Favorites: React.FC = () => {
    return (
        <React.Fragment>
            <Title level={2}>Избранное</Title>
            <ProductsWall isCategory count={4} />
            <Divider />
            <ProductsWall isCategory count={5} />
        </React.Fragment>
    );
};
