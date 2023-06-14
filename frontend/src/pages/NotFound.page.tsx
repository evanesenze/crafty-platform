import { Result, Typography } from 'antd';
import { Link } from 'components';
import React from 'react';
import { clientRoutes } from 'utils/config';

const { Title } = Typography;

export const NotFound = () => {
    return (
        <Result
            status="404"
            title="Страница не нашлась"
            subTitle="Упс… Мы не можем найти то, что Вы ищете"
            extra={
                <Link to={clientRoutes.home}>
                    <Title level={4}>Главная</Title>
                </Link>
            }
        />
    );
};
