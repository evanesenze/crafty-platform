import React from 'react';
import style from './CartItemContainer.style.module.css';
import { Col, Modal, Row, Typography } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Product, useDeleteFromBasketMutation } from 'store';
import { getPrice } from 'utils';
import { Image } from '../Image';

const { Text } = Typography;

const fontStyle: React.CSSProperties = { fontSize: 24 };

type CartItemContainerProps = {
    product: Product;
    count?: number;
    price?: number;
    itemId?: string;
};

export const CartItemContainer: React.FC<CartItemContainerProps> = ({ product, count, price, itemId }) => {
    const { images, name } = product;
    const priceStr = getPrice({ value: price ?? product.price });
    const [deleteFromBasket] = useDeleteFromBasketMutation();

    const onDelete = (id: string) =>
        Modal.confirm({
            title: 'Подтвердите действие',
            content: 'Удалить из корзины?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: async () => deleteFromBasket(id).unwrap().catch(console.error),
        });

    return (
        <Row wrap={false}>
            <Col>
                <Image src={images[0]} height="200px" className={style.cart_item_image} />
            </Col>
            <Col flex="auto" offset={1} style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                <Row>
                    <Col>
                        <Row>
                            <Text ellipsis strong style={fontStyle}>
                                {name}
                            </Text>
                        </Row>
                        <Row>
                            <Text style={{ color: '#929292' }}>Мастер Анастасия</Text>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {count && (
                        <Row align="middle" wrap={false}>
                            <Col style={{ borderRadius: 9, border: '1px solid black', padding: '5px 15px', display: 'flex', gap: 15 }}>
                                <MinusOutlined />
                                <span>{count}</span>
                                <PlusOutlined />
                            </Col>
                            <Col offset={1}>
                                <CloseOutlined onClick={() => itemId && onDelete(itemId)} style={{ fontSize: 21 }} />
                            </Col>
                        </Row>
                    )}
                </Row>
            </Col>
            <Col>
                <Text strong ellipsis style={fontStyle}>
                    {priceStr}
                </Text>
            </Col>
        </Row>
    );
};
