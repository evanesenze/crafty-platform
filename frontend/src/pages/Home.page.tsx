import { AdsBlock } from 'components';
import React from 'react';
import ad1 from '../assets/ad_1.png';
import { ProductsWall } from 'widgets';
import { useGetRecommendationsQuery } from 'store/apis';

const images = [
    {
        category: '642e7f71e9cc885437fef317',
        url: ad1,
    },
    {
        category: '642e7f73e9cc885437fef324',
        url: ad1,
    },
];

export const Home: React.FC = () => {
    const { data: products } = useGetRecommendationsQuery();

    return (
        <React.Fragment>
            <AdsBlock containerStyle={{ margin: '0 -70px' }} images={images} />
            <ProductsWall products={products} column={5} title="Рекомендуем для вас" />
        </React.Fragment>
    );
};
