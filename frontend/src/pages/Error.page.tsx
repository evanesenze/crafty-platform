import { Result, Typography } from 'antd';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { clientRoutes } from 'utils/config';

const { Title } = Typography;

export const Error: React.FC = () => {
    const error = useRouteError() as any;
    const errorMessage = `Произошла ошибка. ${error?.message || 'Повторите попытку позже или обратитесь в поддержку'}`;

    return (
        <Result
            status="500"
            title="Что-то пошло не так"
            subTitle={errorMessage}
            extra={
                <Link to={clientRoutes.home}>
                    <Title level={4}>Главная</Title>
                </Link>
            }
        />
    );
};
