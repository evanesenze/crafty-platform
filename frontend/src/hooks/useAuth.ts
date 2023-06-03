import { message } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { AuthSuccess, LoginDto, RefreshTokenDto, RegisterDto, useLoginMutation, useRefreshTokenMutation, useRegisterMutation } from 'store';
import { useAppActions, useAppSelector } from './useApp';

const accessTokenName = 'accessToken';
const refreshTokenName = 'refreshToken';

export const useAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies([accessTokenName, refreshTokenName]);
    const [loginFetch, loginState] = useLoginMutation();
    const [refreshFetch, refreshState] = useRefreshTokenMutation();
    const [registerFetch, registerState] = useRegisterMutation();
    const { authByCredentials, resetAuth } = useAppActions();
    const { isAuth, isError } = useAppSelector((state) => state.auth);

    useEffect(() => {
        cookies.refreshToken && !isAuth && refresh({ refreshToken: cookies.refreshToken });
    }, [cookies.refreshToken]);

    const saveCredentials = (creds: AuthSuccess) => {
        console.log(creds);
        const { refreshToken, accessToken } = creds;
        const refreshExpires = new Date();
        refreshExpires.setDate(refreshExpires.getDate() + 7);
        const accessExpires = new Date();
        accessExpires.setHours(accessExpires.getHours() + 1);
        setCookie(accessTokenName, accessToken, { path: '/', expires: accessExpires });
        setCookie(refreshTokenName, refreshToken, { path: '/', expires: refreshExpires });
        return authByCredentials(creds);
    };

    const onError = (action: 'reg' | 'login' | 'refetch') => {
        let msg = 'Произошла ошибка';
        switch (action) {
            case 'reg':
                msg += ' при регистрации';
                break;
            case 'login':
                msg += ' при входе';
                break;
            case 'refetch':
                msg += ' при обновлении';
                break;
        }
        message.error(msg);
        resetAuth({ isError: true });
    };

    const loading = loginState.isLoading || refreshState.isLoading || registerState.isLoading;

    const login = (body: LoginDto) =>
        loginFetch(body)
            .unwrap()
            .then(saveCredentials)
            .catch(() => onError('login'));

    const register = (body: RegisterDto) =>
        registerFetch(body)
            .unwrap()
            .then(saveCredentials)
            .catch(() => onError('reg'));

    const refresh = (body: RefreshTokenDto) =>
        refreshFetch(body)
            .unwrap()
            .then(saveCredentials)
            .catch(() => onError('refetch'));

    return { isAuth, loading, login, register, isError };
};
