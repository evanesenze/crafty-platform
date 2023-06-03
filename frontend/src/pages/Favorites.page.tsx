import { Divider, Typography } from 'antd';
import React, { useMemo } from 'react';
import { Product, useGetProfileQuery } from 'store';
import { ProductsWall } from 'widgets';

const { Title } = Typography;

export const Favorites: React.FC = () => {
    const { data: profile } = useGetProfileQuery();

    const categories = useMemo(
        () =>
            profile
                ? profile.favorites.reduce((acc, item) => {
                      const categoryName = item.category?.name ?? 'Без категории';
                      acc[categoryName] ??= [];
                      acc[categoryName].push(item);
                      return acc;
                  }, {} as Record<string, Product[]>)
                : {},
        [profile?.favorites]
    );

    console.log(categories);

    return (
        <React.Fragment>
            <Title level={2}>Избранное</Title>
            {Object.entries(categories).map(([title, products]) => (
                <ProductsWall key={title} title={title} products={products} />
            ))}
        </React.Fragment>
    );
};
