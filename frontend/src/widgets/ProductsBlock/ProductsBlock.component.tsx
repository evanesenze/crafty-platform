import { ProductCard } from 'components/ProductCard';
import React from 'react';
import style from './ProductsBlock.style.module.css';
import { Typography } from 'antd';

export type ProductsBlockProps = {
    padding?: string;
    title?: string;
};

const { Title } = Typography;

const url = 'https://detskiy-sad.com/wp-content/uploads/2016/09/kartinki-na-shkafchiki-s-igrushkami-22.jpg';
const price = 10000;

export const ProductsBlock: React.FC<ProductsBlockProps> = ({ padding, title }) => {
    return (
        <div style={{ padding }}>
            {title && <Title level={2}>{title}</Title>}
            <div className={style.products_list}>
                <ProductCard id='1' url={url} price={price} text="Набор столовых приборов" />
                <ProductCard id='2' url={url} price={price} text="Набор столовых приборов" />
                <ProductCard id='3' url={url} price={price} text="Набор столовых приборов" />
                <ProductCard id='4' url={url} price={price} text="Набор столовых приборов" />
            </div>
        </div>
    );
};
