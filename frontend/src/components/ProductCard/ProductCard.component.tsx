import React from 'react';
import style from './ProductCard.style.module.css';
import { Typography } from 'antd';
import { getPrice } from 'utils';
import { Link, generatePath } from 'react-router-dom';
import { clientRoutes } from '../../utils/config';
import { Product } from 'store/apis';
import { Image } from '../Image';

const { Title, Text } = Typography;

export const ProductCard: React.FC<Product> = ({ id, price, images, name }) => {
    const title = getPrice({ value: price });
    const productPath = generatePath(clientRoutes.product, { id });
    return (
        <Link to={productPath} className={style.product_card}>
            <Image className={style.product_card__image} src={images[0]} />
            <Title className={style.product_card__title} level={3} ellipsis title={title}>
                {title}
            </Title>
            <Text className={style.product_card__text} ellipsis>
                {name}
            </Text>
        </Link>
    );
};
