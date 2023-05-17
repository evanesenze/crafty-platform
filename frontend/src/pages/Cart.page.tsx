import { Button, Divider, Typography } from 'antd';
import React from 'react';
import { CartLayout } from 'widgets';

const { Title, Text } = Typography;

export const Cart: React.FC = () => {
    return (
        <React.Fragment>
            <Title level={2}>Корзина</Title>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 120 }}>
                <CartLayout />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button type="primary" block size="large" style={{ height: 74 }}>
                        Перейти к оформлению
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontSize: 14 }}>Всего: 2 товара</Text>
                        <Text style={{ fontSize: 14 }}>7 800 ₽ </Text>
                    </div>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 24 }} strong>
                            Итого:
                        </Text>
                        <Text style={{ fontSize: 32 }} strong>
                            7 800 ₽
                        </Text>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
