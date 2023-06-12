import { useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { AuthSuccess, LoginDto, RefreshTokenDto, RegisterDto, useLoginMutation, useRefreshTokenMutation, useRegisterMutation } from '../store';
import { useAppActions, useAppSelector } from './useApp';
import { Alert } from 'react-native';

const accessTokenName = 'accessToken';
const refreshTokenName = 'refreshToken';

export const useAuth = () => {
  const accessTokenStorage = useAsyncStorage(accessTokenName);
  const refreshTokenStorage = useAsyncStorage(refreshTokenName);
  const [loginFetch, loginState] = useLoginMutation();
  const [refreshFetch, refreshState] = useRefreshTokenMutation();
  const [registerFetch, registerState] = useRegisterMutation();
  const { authByCredentials, resetAuth } = useAppActions();
  const { isAuth, isError } = useAppSelector((state) => state.auth);

  const check = async () => {
    const refreshToken = await refreshTokenStorage.getItem();
    refreshToken && !isAuth && refresh({ refreshToken: refreshToken });
  };

  useEffect(() => {
    check();
  }, []);

  const saveCredentials = (creds: AuthSuccess) => {
    console.log(creds);
    const { refreshToken, accessToken } = creds;
    refreshTokenStorage.setItem(refreshToken);
    accessTokenStorage.setItem(accessToken);
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
    Alert.alert('Упс...', msg);
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
