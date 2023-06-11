import React from 'react';
import { Checkbox, Col, Divider, List, Row } from 'antd';
import { CartItemContainer } from 'components';
import { OrderItem, useGetProfileQuery, useUpdateOrderItemMutation } from 'store';
import { find, some } from 'lodash';

export type CartLayoutProps = {
    selectedItems: OrderItem[];
    onSelect: (item: OrderItem) => void;
};

export type QuantityFn = (id: string, count: number) => void;

export const CartLayout: React.FC<CartLayoutProps> = ({ onSelect, selectedItems }) => {
    const { data: profile, isFetching } = useGetProfileQuery();

    return (
        <List
            locale={{ emptyText: 'В корзине пока пусто' }}
            dataSource={profile?.basket}
            loading={isFetching}
            renderItem={(item) => {
                const { id, price, product, quantity } = item;
                const checked = !!find(selectedItems, (x) => x.id === item.id);
                const onChange = () => onSelect(item);
                console.log(checked);
                return (
                    <List.Item key={id}>
                        <Row wrap={false} style={{ width: '100%' }}>
                            <Col>
                                <Row align="middle" style={{ height: '100%' }}>
                                    <Checkbox checked={checked} onChange={onChange} />
                                </Row>
                            </Col>
                            <Col flex={1} offset={1}>
                                <CartItemContainer product={product} count={quantity} price={price} itemId={id} />
                            </Col>
                        </Row>
                    </List.Item>
                );
            }}
        />
    );
};
