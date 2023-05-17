import { AdsBlock } from 'components';
import React from 'react';
import ad1 from '../assets/ad_1.png';
import { ProductsBlock } from 'widgets';

const images = [
    {
        category: '2',
        url: ad1,
    },
    {
        category: '3',
        url: ad1,
    },
];

export const Home: React.FC = () => {
    return (
        <React.Fragment>
            <AdsBlock containerStyle={{ height: 490, margin: '0 -70px' }} images={images} />
            <ProductsBlock title="Рекомендуем для вас" />
        </React.Fragment>
    );
};
