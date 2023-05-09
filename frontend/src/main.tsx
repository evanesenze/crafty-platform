import { router, theme } from './config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import './style.less';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider theme={theme}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </React.StrictMode>
);
