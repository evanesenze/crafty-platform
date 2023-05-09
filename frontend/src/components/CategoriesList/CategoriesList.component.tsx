import React from 'react';
import style from './CategoriesList.style.module.css';
import cn from 'classnames';
import { Space } from 'antd';

export type CategoriesListProps = {
    className?: string;
};

const items: string[] = ['Одежда', 'Украшения', 'Дом и сад', 'Продукты питания', 'Канцелярские товары'];

export const CategoriesList: React.FC<CategoriesListProps> = (props) => {
    const className = cn(style.categories_list, props.className);
    return (
        <Space className={className} size={48}>
            {items.map((item) => (
                <span>{item}</span>
            ))}
        </Space>
    );
};
