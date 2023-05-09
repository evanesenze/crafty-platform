import { createBrowserRouter } from 'react-router-dom';
import { Home, Error, NotFound } from 'pages';
import { ThemeConfig } from 'antd';
import { PageLayout } from 'widgets';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '*',
                element: <NotFound />,
                errorElement: <Error />,
            },
        ],
    },
]);

export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#00b96b',
        colorBorder: 'black',
    },
};
