import { ProductCard } from 'components/ProductCard';
import React from 'react';
import style from './ProductsBlock.style.module.css';
import { Typography } from 'antd';
import { Product } from 'store';

export type ProductsBlockProps = {
    title?: string;
    products: Product[];
};

const { Title } = Typography;

export const ProductsBlock: React.FC<ProductsBlockProps> = ({ title, products }) => {
    return (
        <div>
            {title && <Title level={2}>{title}</Title>}
            <div className={style.products_list}>
                {products.map((item) => (
                    <ProductCard key={item.slug} {...item} />
                ))}
            </div>
        </div>
    );
};
