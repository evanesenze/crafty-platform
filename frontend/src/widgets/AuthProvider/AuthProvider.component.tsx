import { Loading } from 'components';
import { useAuth } from 'hooks';
import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { clientRoutes } from 'utils/config';

export type AuthProviderProps = {
    redirectUnAuth?: boolean | string;
    redirectAuth?: boolean | string;
    showWhen?: boolean;
};

export const AuthProvider: React.FC<PropsWithChildren<AuthProviderProps>> = ({ children, redirectAuth, redirectUnAuth, showWhen = true }) => {
    const { isAuth, loading } = useAuth();
    const redirectUnAuthPath = typeof redirectUnAuth === 'string' ? redirectUnAuth : clientRoutes.auth;
    const redirectAuthPath = typeof redirectAuth === 'string' ? redirectAuth : clientRoutes.home;

    if (!isAuth && loading) return <Loading />;
    if (!isAuth && redirectUnAuth) return <Navigate to={redirectUnAuthPath} />;
    if (isAuth && redirectAuth) return <Navigate to={redirectAuthPath} />;
    return isAuth === showWhen ? <React.Fragment>{children}</React.Fragment> : null;
};
