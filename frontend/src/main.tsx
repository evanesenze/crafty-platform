import { theme, clientRoutes } from './config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import './style.less';
import { IntlProvider } from 'react-intl';
import { PageLayout } from 'widgets';
import { createBrowserRouter } from 'react-router-dom';
import { Home, Cart, Error, NotFound, Profile, Auth, Create, Orders, Favorites, Products, Product } from 'pages';
import ru from 'antd/locale/ru_RU';

const router = createBrowserRouter([
    {
        path: clientRoutes.auth,
        element: <Auth />,
    },
    {
        path: '/',
        element: <PageLayout />,
        errorElement: <Error />,
        children: [
            {
                path: clientRoutes.home,
                element: <Home />,
            },
            {
                path: clientRoutes.cart,
                element: <Cart />,
            },
            {
                path: clientRoutes.profile,
                element: <Profile />,
            },
            {
                path: clientRoutes.create,
                element: <Create />,
            },
            {
                path: clientRoutes.orders,
                element: <Orders />,
            },
            {
                path: clientRoutes.favorites,
                element: <Favorites />,
            },
            {
                path: clientRoutes.products,
                element: <Products />,
            },
            {
                path: clientRoutes.product,
                element: <Product />,
            },
            {
                path: clientRoutes[404],
                element: <NotFound />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider theme={theme} locale={ru}>
            <IntlProvider locale="ru">
                <RouterProvider router={router} />
            </IntlProvider>
        </ConfigProvider>
    </React.StrictMode>
);
