import { Button, ConfigProvider, Form, Typography } from 'antd';
import { Input } from 'components';
import { clientRoutes } from '../config';
import React from 'react';
import { Navigate } from 'react-router-dom';

const { Title, Text } = Typography;

const passwordHelp = <Text style={{ display: 'block', textAlign: 'end', fontSize: 12, cursor: 'pointer' }}>Забыли пароль?</Text>;

const isAuth = true;

export const Auth: React.FC = () => {
    if (isAuth) return <Navigate to={clientRoutes.home} />;

    return (
        <ConfigProvider theme={{ token: { colorText: 'white', colorBgContainer: 'black', colorBorder: 'white', colorIcon: 'white' } }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'black', flexDirection: 'column', height: '100%' }}>
                <Title style={{ marginBottom: 25 }}>CRAFTY</Title>
                <Text style={{ fontSize: 32, lineHeight: '32px' }}>Авторизация</Text>
                <Form layout="vertical">
                    <Form.Item label="Логин">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Пароль" help={passwordHelp}>
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item>
                        <ConfigProvider theme={{ token: { colorText: 'black', colorBgContainer: 'white' } }}>
                            <Button size="large" block>
                                Войти
                            </Button>
                        </ConfigProvider>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Text>Регистрация</Text>
                    </Form.Item>
                </Form>
            </div>
        </ConfigProvider>
    );
};
