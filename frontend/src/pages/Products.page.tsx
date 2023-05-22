import { Divider, Typography } from 'antd';
import React from 'react';
import { ProductsBlock } from 'widgets';

const { Title, Text } = Typography;

export const Products: React.FC = () => {
    return (
        <React.Fragment>
            <Title level={2} style={{ marginBottom: 10 }}>
                Найдено 3 товара
            </Title>
            <Text style={{ color: 'gray' }}>Глиняная посуда</Text>
            <Divider />
            <ProductsBlock />
        </React.Fragment>
    );
};
