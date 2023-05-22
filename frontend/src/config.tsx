import { ThemeConfig } from 'antd';

export const clientRoutes = {
    home: '/',
    404: '/404',
    auth: '/auth',
    products: '/products',
    product: '/products/:id',
    getProductsPath: (category: string) => `/products?category=${category}`,
    cart: '/cart',
    profile: '/profile',
    create: '/create',
    orders: '/orders',
    favorites: '/favorites',
} as const;

export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#4B4B4B',
        colorBorder: 'black',
        fontSize: 18,
        controlInteractiveSize: 30,
    },
};
