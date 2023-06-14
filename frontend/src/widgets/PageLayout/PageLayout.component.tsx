import React, { KeyboardEventHandler, useRef } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Input, InputProps, InputRef, Layout, MenuProps } from 'antd';
import style from './PageLayout.style.module.css';
import { HeaderControls, Logo, CategoriesList, ControlState } from 'components';
import { useAuth } from 'hooks';
import { queryParamName } from 'utils/searchParamNames';
import { clientRoutes } from 'utils/config';

const { Header, Content } = Layout;

const inputProps: InputProps = {
    className: style.layout_header__search,
    placeholder: 'Введите запрос',
};

const unauthExclude: ControlState[] = [ControlState.Create, ControlState.Favorites, ControlState.Orders, ControlState.Cart];

export const PageLayout: React.FC = () => {
    const { isAuth } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<InputRef | null>(null);
    const nav = useNavigate();

    const onSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
        const value = (e.target as HTMLInputElement)?.value;
        nav(clientRoutes.products);
        searchParams.set(queryParamName, value);
        setSearchParams(searchParams);
    };

    const defaultValue = searchParams.get(queryParamName) ?? undefined;
    const exclude = isAuth ? [] : unauthExclude;
    const mode: MenuProps['mode'] = 'horizontal';

    return (
        <Layout className={style.layout}>
            <Header className={style.layout__header}>
                <Logo className={style.layout_header__logo} />
                <Input defaultValue={defaultValue} ref={inputRef} {...inputProps} onPressEnter={onSearch} />
                <HeaderControls exclude={exclude} className={style.layout_header__controls} />
                <CategoriesList mode={mode} className={style.layout_header__categories_list} />
            </Header>
            <Content className={style.layout__content}>
                <Outlet />
            </Content>
        </Layout>
    );
};
