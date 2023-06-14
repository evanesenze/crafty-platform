import { List, Typography } from 'antd';
import { useAppSelector } from 'hooks/useApp';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useGetOrdersQuery, useGetProfileQuery } from 'store';
import { ProductsWall } from 'widgets';

const { Title } = Typography;

export const Orders: React.FC = () => {
    const userId = useAppSelector((state) => state.auth.user?.id);
    const { data: orders, isFetching } = useGetOrdersQuery({ buyerId: userId }, { skip: !userId });

    return (
        <React.Fragment>
            <Title level={2}>Мои заказы</Title>
            <List
                locale={{ emptyText: 'У вас еще нет заказов' }}
                dataSource={orders}
                loading={isFetching}
                renderItem={(item) => <ProductsWall key={item.id} order={item} />}
            />
        </React.Fragment>
    );
};
