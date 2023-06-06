import { Button, Col, Divider, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { CartLayout } from 'widgets';

const { Title, Text } = Typography;

export const Cart: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const onSelect = (id: string) => {
        setSelectedItems((x) => {
            return x.includes(id) ? x.filter((item) => item !== id) : [...x, id];
        });
    };

    const canCreateOrder = !!selectedItems.length;

    return (
        <React.Fragment>
            <Title level={2}>Корзина</Title>
            <Row>
                <Col span={17}>
                    <CartLayout onSelect={onSelect} selectedItems={selectedItems} />
                </Col>
                <Col offset={1} span={6}>
                    <Row>
                        <Button disabled={!canCreateOrder} type="primary" block size="large" style={{ height: 74 }}>
                            Перейти к оформлению
                        </Button>
                    </Row>
                    {canCreateOrder && (
                        <>
                            <Row style={{ marginTop: 20 }} justify="space-between">
                                <Text style={{ fontSize: 14 }}>Всего: {selectedItems.length} товара</Text>
                                <Text style={{ fontSize: 14 }}>7 800 ₽ </Text>
                            </Row>
                            <Divider />
                            <Row justify="space-between" align={'middle'}>
                                <Text style={{ fontSize: 24, lineHeight: '24px' }} strong>
                                    Итого:
                                </Text>
                                <Text style={{ fontSize: 32 }} strong>
                                    7 800 ₽
                                </Text>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
        </React.Fragment>
    );
};
