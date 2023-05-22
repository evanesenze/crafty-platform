import { Button, Col, ConfigProvider, Form, Row, Typography } from 'antd';
import { AutoComplete, Input, NumberInput } from 'components';
import React from 'react';
import { PicturesWall } from 'widgets';

const { Title } = Typography;

export const Create: React.FC = () => {
    return (
        <React.Fragment>
            <Title level={2}>Создание товара</Title>
            <Form layout="vertical" style={{ width: '100%' }}>
                <Row style={{ width: '100%' }}>
                    <Col span={8}>
                        <Form.Item label="Название">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Категория">
                            <AutoComplete />
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="Цена">
                                        <NumberInput min={0} addonAfter="₽" />
                                    </Form.Item>
                                </Col>
                                <Col offset={2} span={11}>
                                    <Form.Item label="Количество">
                                        <NumberInput min={0} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item label="Описание">
                            <Input type="textArea" props={{ rows: 4 }} />
                        </Form.Item>
                    </Col>
                    <Col offset={4} span={12}>
                        <Form.Item label="Галерея">
                            <PicturesWall />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col offset={9} span={6}>
                        <ConfigProvider theme={{ token: { colorText: 'white', colorBgContainer: 'black' } }}>
                            <Button block size="large">
                                Создать
                            </Button>
                        </ConfigProvider>
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    );
};
