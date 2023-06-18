import {
    FireOutlined,
    HeartOutlined,
    PlayCircleOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react';
import style from './HeaderControls.style.module.css';
import cn from 'classnames';
import { Badge, Menu, MenuProps } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useNavigate } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useGetProfileQuery } from 'store/apis';

export enum ControlState {
    Create = 'create',
    Profile = 'profile',
    Orders = 'orders',
    Favorites = 'favorites',
    Cart = 'cart',
    Tinder = 'tinder',
    Education = 'education',
}

export type ControlStateKey = keyof typeof ControlState;

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
            key: ControlState.Tinder,
            itemIcon: <FireOutlined className={cn(style.header_control, style.header_control__revert)} />,
        },
        {
            key: ControlState.Education,
            itemIcon: <PlayCircleOutlined className={style.header_control} />,
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

type StateCallback = {
    [key in `on${ControlStateKey}Click`]?: () => void;
};

export type HeaderControlsProps = MenuProps &
    StateCallback & {
        exclude?: ControlState[];
        include?: ControlState[];
    };

const controlStateValues = [
    ControlState.Cart,
    ControlState.Create,
    ControlState.Favorites,
    ControlState.Orders,
    ControlState.Profile,
    ControlState.Tinder,
    ControlState.Education,
];

export const HeaderControls: React.FC<HeaderControlsProps> = ({ exclude, include, onTinderClick, ...props }) => {
    const nav = useNavigate();
    const breadcrumbs = useBreadcrumbs();
    const [selectedKey, setSelectedKey] = useState<string>();
    const { data: profile } = useGetProfileQuery();

    const className = cn(style.header_controls, props.className);
    const items = useMemo(() => getItems(profile?.basket.length ?? 0), [profile]);

    useEffect(() => {
        const activeTab = breadcrumbs.map((item) => item.key.replaceAll('/', '')).find((item) => controlStateValues.includes(item as ControlState));
        activeTab && selectedKey !== activeTab && setSelectedKey(activeTab);
    }, [breadcrumbs]);

    const tabs = include
        ? items.filter((item) => include.includes(item.key as ControlState))
        : items.filter((item) => !exclude?.includes(item.key as ControlState));

    const onSelect: MenuProps['onSelect'] = ({ key }) => {
        const controlKey = key as ControlState;
        switch (controlKey) {
            case ControlState.Tinder:
                return onTinderClick?.();
            default:
                nav(key);
        }
    };

    return (
        <Menu
            {...props}
            selectedKeys={selectedKey ? [selectedKey] : undefined}
            onSelect={onSelect}
            className={className}
            mode="horizontal"
            disabledOverflow
            items={tabs}
        />
    );
};
