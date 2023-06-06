import React from 'react';
import style from './CartLayout.style.module.css';
import { Checkbox, Col, Divider, List, Row } from 'antd';
import { CartItemContainer } from 'components';
import { useGetProfileQuery } from 'store/apis';

export type CartLayoutProps = {
    selectedItems: string[];
    onSelect: (id: string) => void;
};

export const CartLayout: React.FC<CartLayoutProps> = ({ onSelect, selectedItems }) => {
    const { data: profile, isFetching } = useGetProfileQuery();
    return (
        <List
            locale={{ emptyText: 'В корзине пока пусто' }}
            dataSource={profile?.basket}
            loading={isFetching}
            renderItem={({ id, price, product, quantity }) => (
                <List.Item key={id}>
                    <Row wrap={false} style={{ width: '100%' }}>
                        <Col>
                            <Row align="middle" style={{ height: '100%' }}>
                                <Checkbox checked={selectedItems.includes(id)} onChange={() => onSelect(id)} />
                            </Row>
                        </Col>
                        <Col flex={1} offset={1}>
                            <CartItemContainer product={product} count={quantity} price={price} itemId={id} />
                        </Col>
                    </Row>
                </List.Item>
            )}
        />
    );
};
