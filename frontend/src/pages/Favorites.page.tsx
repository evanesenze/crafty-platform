import { List, Typography } from 'antd';
import React, { useMemo } from 'react';
import { Product, useGetProfileQuery } from 'store';
import { ProductsWall } from 'widgets';

const { Title } = Typography;

export const Favorites: React.FC = () => {
    const { data: profile } = useGetProfileQuery();

    const categories = useMemo(() => {
        const obj = profile
            ? profile.favorites.reduce((acc, item) => {
                  const categoryId = (typeof item.category === 'string' ? item.category : item.category?.id) ?? 'default';
                  acc[categoryId] ??= [];
                  acc[categoryId].push(item);
                  return acc;
              }, {} as Record<string, Product[]>)
            : {};
        return Object.entries(obj);
    }, [profile?.favorites]);

    return (
        <React.Fragment>
            <Title level={2}>Избранное</Title>
            <List
                locale={{ emptyText: 'В избранном пока что пусто' }}
                dataSource={categories}
                renderItem={([categoryId, products]) => <ProductsWall key={categoryId} categoryId={categoryId} products={products} />}
            />
        </React.Fragment>
    );
};
