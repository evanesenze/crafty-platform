import React from 'react';
import style from './CartItemContainer.style.module.css';
import { Col, Modal, Row, Skeleton, Typography } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Product, useDeleteFromBasketMutation, useGetProfileQuery, useUpdateOrderItemMutation, useUpdateProductMutation } from 'store';
import { getPrice } from 'utils';
import { Image } from '../Image';
import { QuantityFn } from 'widgets';

const { Text } = Typography;

const fontStyle: React.CSSProperties = { fontSize: 24 };

type CartItemContainerProps = {
    product: Product;
    count?: number;
    price?: number;
    itemId?: string;
};

const useControllers = (count?: number, itemId?: string) => {
    const [deleteFromBasket, basketState] = useDeleteFromBasketMutation();
    const [updateOrderItem, orderState] = useUpdateOrderItemMutation();
    const { refetch, isFetching } = useGetProfileQuery();

    const loading = isFetching || orderState.isLoading || basketState.isLoading;

    const handleCount: QuantityFn = (id, quantity) => {
        updateOrderItem({ id, quantity })
            .unwrap()
            .then(() => {
                refetch();
            })
            .catch(console.error);
    };

    const onDelete = (id: string) =>
        Modal.confirm({
            title: 'Подтвердите действие',
            content: 'Удалить из корзины?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: async () => deleteFromBasket(id).unwrap().catch(console.error),
        });

    const onPlus = () => !!itemId && !!count && handleCount(itemId, count + 1);
    const onMinus = () => !!itemId && (!!count && count > 1 ? handleCount(itemId, count - 1) : onDelete(itemId));

    return { onDelete, onPlus, onMinus, loading };
};

const CartItemControls: React.FC<Omit<CartItemContainerProps, 'product' | 'price'>> = ({ count, itemId }) => {
    const { onDelete, onMinus, onPlus, loading } = useControllers(count, itemId);
    if (!count) return null;
    if (loading) return <Skeleton.Input active size="large" />;

    return (
        <Row align="middle" wrap={false}>
            <Col style={{ borderRadius: 9, border: '1px solid black', padding: '5px 15px', display: 'flex', gap: 15 }}>
                <MinusOutlined onClick={onMinus} />
                <span>{count}</span>
                <PlusOutlined onClick={onPlus} />
            </Col>
            <Col offset={1}>
                <CloseOutlined onClick={() => itemId && onDelete(itemId)} style={{ fontSize: 21 }} />
            </Col>
        </Row>
    );
};

export const CartItemContainer: React.FC<CartItemContainerProps> = ({ product, price, ...props }) => {
    const { images, name } = product;
    const priceStr = getPrice({ value: price ?? product.price });

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
                    <CartItemControls {...props} />
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
