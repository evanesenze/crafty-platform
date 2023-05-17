import { router, theme } from './config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import './style.less';
import { IntlProvider } from 'react-intl';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider theme={theme}>
            <IntlProvider locale="ru">
                <RouterProvider router={router} />
            </IntlProvider>
        </ConfigProvider>
    </React.StrictMode>
);
