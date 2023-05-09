import { HeartOutlined, PlusOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import style from './HeaderControls.style.module.css';
import cn from 'classnames';
import { Menu, MenuProps } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

export enum ControlState {
    Add = 'add',
    User = 'user',
    Shop = 'shop',
    Favorite = 'favorite',
    Cart = 'cart',
}

const items: MenuItemType[] = [
    {
        key: ControlState.Add,
        itemIcon: <PlusOutlined className={style.header_control} />,
    },
    {
        key: ControlState.User,
        itemIcon: <UserOutlined className={style.header_control} />,
    },
    {
        key: ControlState.Shop,
        itemIcon: <ShoppingOutlined className={style.header_control} />,
    },
    {
        key: ControlState.Favorite,
        itemIcon: <HeartOutlined className={style.header_control} />,
    },

    {
        key: ControlState.Cart,
        itemIcon: <ShoppingCartOutlined className={style.header_control} />,
    },
];

export type HeaderControlsProps = MenuProps & {
    exclude?: ControlState[];
    include?: ControlState[];
};

export const HeaderControls: React.FC<HeaderControlsProps> = ({ exclude, include, ...props }) => {
    const className = cn(style.header_controls, props.className);

    const tabs = include
        ? items.filter((item) => include.includes(item.key as ControlState))
        : items.filter((item) => !exclude?.includes(item.key as ControlState));

    return <Menu {...props} className={className} mode="horizontal" items={tabs} />;
};
