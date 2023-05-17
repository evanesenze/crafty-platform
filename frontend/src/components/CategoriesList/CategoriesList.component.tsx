import React from 'react';
import style from './CategoriesList.style.module.css';
import cn from 'classnames';
import { Menu, MenuProps } from 'antd';

export type CategoriesListProps = {
    className?: string;
};

const items: MenuProps['items'] = [
    {
        key: 'Одежда',
        label: 'Одежда',
    },
    {
        key: 'Украшения',
        label: 'Украшения',
    },
    {
        key: 'Дом и сад',
        label: 'Дом и сад',
    },
    {
        key: 'Продукты питания',
        label: 'Продукты питания',
    },
    {
        key: 'Канцелярские товары',
        label: 'Канцелярские товары',
    },
];

export const CategoriesList: React.FC<CategoriesListProps> = (props) => {
    const className = cn(style.categories_list, props.className);
    return <Menu className={className} mode="horizontal" items={items} />;
};
