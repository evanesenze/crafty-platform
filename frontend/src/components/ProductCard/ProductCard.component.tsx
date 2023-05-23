import React from 'react';
import style from './ProductCard.style.module.css';
import { Typography } from 'antd';
import { getPrice } from 'utils';
import { Link, generatePath } from 'react-router-dom';
import { clientRoutes } from '../../utils/config';

export type ProductCardProps = {
    id: string;
    url: string;
    price: number;
    text: string;
};

const { Title, Text } = Typography;

export const ProductCard: React.FC<ProductCardProps> = ({ id, url, price, text }) => {
    const css: React.CSSProperties = { backgroundImage: `url(${url})` };
    const title = getPrice({ value: price });
    const productPath = generatePath(clientRoutes.product, { id });
    return (
        <Link to={productPath} className={style.product_card}>
            <div className={style.product_card__image} style={css} />
            <Title className={style.product_card__title} level={3} ellipsis title={title}>
                {title}
            </Title>
            <Text className={style.product_card__text} ellipsis>
                {text}
            </Text>
        </Link>
    );
};
