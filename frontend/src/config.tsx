import { createBrowserRouter } from 'react-router-dom';
import { Home, Cart, Error, NotFound, Profile } from 'pages';
import { ThemeConfig } from 'antd';
import { PageLayout } from 'widgets';

export const clientRoutes = {
    home: '/',
    products: '/products',
    product: '/products/:id',
    getProductsPath: (category: string) => `/products?category=${category}`,
    cart: '/cart',
    profile: '/profile',
} as const;

export const router = createBrowserRouter([
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
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#4B4B4B',
        colorBorder: 'black',
        fontSize: 18,
        controlInteractiveSize: 30,
    },
};
