import { theme, clientRoutes } from 'utils';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import './style.less';
import { IntlProvider } from 'react-intl';
import { AuthProvider, PageLayout } from 'widgets';
import { createBrowserRouter } from 'react-router-dom';
import { Home, Cart, Error, NotFound, Profile, Auth, Create, Orders, Favorites, Products, Product } from 'pages';
import ru from 'antd/locale/ru_RU';
import { Provider } from 'react-redux';
import { store } from 'store';
import { CookiesProvider } from 'react-cookie';

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
                path: clientRoutes.products,
                element: <Products />,
            },
            {
                path: clientRoutes.product,
                element: <Product />,
            },
            {
                path: '/',
                element: <AuthProvider isOutlet redirectUnAuth={clientRoutes.auth} />,
                children: [
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
                ],
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
                <Provider store={store}>
                    <CookiesProvider>
                        <RouterProvider router={router} />
                    </CookiesProvider>
                </Provider>
            </IntlProvider>
        </ConfigProvider>
    </React.StrictMode>
);
