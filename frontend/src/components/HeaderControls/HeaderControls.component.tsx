import { HeartOutlined, PlusOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';
import style from './HeaderControls.style.module.css';
import cn from 'classnames';
import { Badge, Menu, MenuProps } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/useApp';

export enum ControlState {
    Create = 'create',
    Profile = 'profile',
    Orders = 'orders',
    Favorites = 'favorites',
    Cart = 'cart',
}

const getItems = (count: number): MenuItemType[] => {
    return [
        {
            key: ControlState.Create,
            itemIcon: <PlusOutlined className={style.header_control} />,
        },
        {
            key: ControlState.Profile,
            itemIcon: <UserOutlined className={style.header_control} />,
        },
        {
            key: ControlState.Orders,
            itemIcon: <ShoppingOutlined className={style.header_control} />,
        },
        {
            key: ControlState.Favorites,
            itemIcon: <HeartOutlined className={style.header_control} />,
        },

        {
            key: ControlState.Cart,
            itemIcon: (
                <Badge count={count}>
                    <ShoppingCartOutlined className={style.header_control} />
                </Badge>
            ),
        },
    ];
};

export type HeaderControlsProps = MenuProps & {
    exclude?: ControlState[];
    include?: ControlState[];
};

export const HeaderControls: React.FC<HeaderControlsProps> = ({ exclude, include, ...props }) => {
    const className = cn(style.header_controls, props.className);
    const nav = useNavigate();
    const items = useMemo(() => getItems(0), []);
    const tabs = include
        ? items.filter((item) => include.includes(item.key as ControlState))
        : items.filter((item) => !exclude?.includes(item.key as ControlState));

    const onSelect = (info: { key: string }) => {
        nav(info.key);
    };

    return <Menu {...props} onChange={console.log} onSelect={onSelect} className={className} mode="horizontal" items={tabs} />;
};
