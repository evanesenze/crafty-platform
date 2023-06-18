import { AdsBlock } from 'components';
import React from 'react';
import ad1 from '../assets/ad_1.png';
import { ProductsWall } from 'widgets';
import { useGetRecommendationsQuery } from 'store/apis';

const images = [
    {
        category: '648f72410bfd598e244bc1bc',
        url: ad1,
    },
    {
        category: '648f72410bfd598e244bc1bc',
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
