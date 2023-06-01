import { Button, ConfigProvider, Input, Form, Typography, message, Switch, Row, Col } from 'antd';
// import { Input } from 'components';
import { useAuth } from 'hooks';
import React, { useState } from 'react';
import { AuthProvider } from 'widgets';

const { Title, Text } = Typography;

const passwordHelp = <Text style={{ display: 'block', textAlign: 'end', fontSize: 12, cursor: 'pointer' }}>Забыли пароль?</Text>;

export const Auth: React.FC = () => {
    const { login, register, loading } = useAuth();
    const [isRegistration, setIsRegistration] = useState(false);

    const onChange = () => setIsRegistration((x) => !x);
    const buttonText = isRegistration ? 'Зарегистрироваться' : 'Войти';

    return (
        <AuthProvider showWhen={false} redirectAuth>
            <ConfigProvider
                theme={{
                    token: {},
                }}
            >
                <Row justify="center">
                    <Col>
                        <Row justify="center">
                            <Title style={{ marginBottom: 25 }}>CRAFTY</Title>
                        </Row>
                        <Row>
                            <Col style={{ backgroundColor: 'gray', padding: '20px 40px', borderRadius: 8 }}>
                                <Text style={{ fontSize: 32, lineHeight: '32px' }}>Авторизация</Text>
                                <Form layout="vertical" onFinish={isRegistration ? register : login} autoComplete="off">
                                    <Form.Item name="email" label="Логин">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="password" label="Пароль" help={!isRegistration && passwordHelp}>
                                        <Input.Password type="password" />
                                    </Form.Item>
                                    {isRegistration && (
                                        <Form.Item name="same_password" label="Повторите пароль">
                                            <Input.Password type="password" />
                                        </Form.Item>
                                    )}
                                    <Form.Item>
                                        <Button disabled={loading} loading={loading} htmlType="submit" size="large" block>
                                            {buttonText}
                                        </Button>
                                    </Form.Item>
                                    <Form.Item style={{ textAlign: 'center' }}>
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    colorPrimary: 'green',
                                                    colorBgBase: 'red',
                                                    colorBgContainer: 'red',
                                                    colorBgContainerDisabled: 'red',
                                                    colorBgLayout: 'red',
                                                },
                                            }}
                                        >
                                            <Switch
                                                checked={isRegistration}
                                                onChange={onChange}
                                                checkedChildren={'Регистрация'}
                                                unCheckedChildren={'Авторизация'}
                                            />
                                        </ConfigProvider>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ConfigProvider>
        </AuthProvider>
    );
};
