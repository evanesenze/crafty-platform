import React, { useMemo } from 'react';
import style from './CategoriesList.style.module.css';
import cn from 'classnames';
import { Button, Menu, MenuProps, Row, Typography } from 'antd';
import { Category, useGetCategoriesQuery } from 'store';
import { CategoriesButton } from '../CategoriesButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categoryParamName, clientRoutes } from 'utils';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

export type CategoriesListProps = {
    mode: MenuProps['mode'];
    search?: string;
    className?: string;
    onSelect?: () => void;
};

const moreButtonKey = 'menu';

const { Text } = Typography;

export const CategoriesList: React.FC<CategoriesListProps> = (props) => {
    const { mode, search } = props;
    const isHorizontal = mode === 'horizontal';
    const { data: categories } = useGetCategoriesQuery({});
    const [searchParams, setSearchParams] = useSearchParams();
    const className = cn(style.categories_list, props.className, { [style.categories_list__horizontal]: isHorizontal });
    const items = useMemo<MenuProps['items']>(
        () => categories?.map((item) => ({ key: item.id, label: item.name.toLocaleLowerCase() })),
        [categories]
    );
    const filteredItems = useMemo(
        () => items?.filter((item) => !search || new RegExp(search).test(String((item as MenuItemType).label))),
        [items, search]
    );
    const nav = useNavigate();

    const onSelect: MenuProps['onSelect'] = ({ key }) => {
        if (key === moreButtonKey) return;
        nav(clientRoutes.products);
        searchParams.set(categoryParamName, key);
        setSearchParams(searchParams);
        props.onSelect?.();
    };

    if (isHorizontal) {
        filteredItems?.unshift({ key: moreButtonKey, label: <CategoriesButton /> });
    }

    const activeCategory = searchParams.get(categoryParamName);

    if (!filteredItems?.length && search)
        return (
            <Row justify="center">
                <Text>Категории "{search}" не найдены</Text>
            </Row>
        );

    return <Menu selectedKeys={activeCategory ? [activeCategory] : []} className={className} onSelect={onSelect} mode={mode} items={filteredItems} />;
};
