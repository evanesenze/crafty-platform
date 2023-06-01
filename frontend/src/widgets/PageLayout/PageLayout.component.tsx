import React from 'react';
import { Outlet } from 'react-router-dom';
import { Input, InputProps, Layout } from 'antd';
import style from './PageLayout.style.module.css';
import { HeaderControls, Logo, CategoriesButton, CategoriesList } from 'components';

const { Header, Content } = Layout;

const inputProps: InputProps = {
    className: style.layout_header__search,
    placeholder: 'Введите запрос',
};

export const PageLayout: React.FC = () => {
    return (
        <Layout className={style.layout}>
            <Header className={style.layout__header}>
                <Logo className={style.layout_header__logo} />
                <Input {...inputProps} />
                <HeaderControls className={style.layout_header__controls} />
                <CategoriesButton className={style.layout_header__categories_button} />
                <CategoriesList className={style.layout_header__categories_list} />
            </Header>
            <Content className={style.layout__content}>
                <Outlet />
            </Content>
        </Layout>
    );
};
