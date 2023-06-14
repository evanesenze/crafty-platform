import { Button, ConfigProvider, Input, Form, Typography, message, Switch, Row, Col } from 'antd';
import { Link } from 'components';
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
                <Row style={{ height: '100%', backgroundColor: 'lightgray' }} align="middle" justify="center">
                    <Col>
                        <Row justify="center">
                            <Title>
                                <Link to="/" style={{ marginBottom: 25, textDecoration: 'none' }}>
                                    CRAFTY
                                </Link>
                            </Title>
                        </Row>
                        <Row>
                            <Col style={{ padding: '0px 40px', borderLeft: '5px solid black' }}>
                                {/* <Text style={{ fontSize: 32, lineHeight: '32px' }}>{isRegistration ? 'Регистрация' : 'Авторизация'}</Text> */}
                                <Row justify="center">
                                    <ConfigProvider
                                        theme={{
                                            token: {fontSize: 20},
                                        }}
                                    >
                                        <Switch
                                            checked={isRegistration}
                                            onChange={onChange}
                                            checkedChildren={'Регистрация'}
                                            unCheckedChildren={'Авторизация'}
                                        />
                                    </ConfigProvider>
                                </Row>
                                <Form layout="vertical" onFinish={isRegistration ? register : login} autoComplete="off">
                                    <Form.Item name="email" label="Логин">
                                        <Input />
                                    </Form.Item>
                                    <Row>
                                        <Col span={isRegistration ? 11 : 24}>
                                            <Form.Item name="password" label="Пароль" help={!isRegistration && passwordHelp}>
                                                <Input.Password type="password" />
                                            </Form.Item>
                                        </Col>
                                        {isRegistration && (
                                            <Col span={11} offset={2}>
                                                <Form.Item name="same_password" label="Повторите пароль">
                                                    <Input.Password type="password" />
                                                </Form.Item>
                                            </Col>
                                        )}
                                    </Row>
                                    <Form.Item>
                                        <Button disabled={loading} loading={loading} htmlType="submit" size="large" block>
                                            {buttonText}
                                        </Button>
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
