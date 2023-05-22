import { Typography } from 'antd';
import React from 'react';
import { ProductsWall } from 'widgets';

const { Title } = Typography;

export const Orders: React.FC = () => {
    return (
        <React.Fragment>
            <Title level={2}>Мои заказы</Title>
            <ProductsWall isOrder count={2} />
        </React.Fragment>
    );
};
