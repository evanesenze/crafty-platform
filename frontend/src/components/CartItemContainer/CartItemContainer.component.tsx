import React from 'react';
import style from './CartItemContainer.style.module.css';
import { Col, Modal, Row, Skeleton, Typography, message } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Product,
    useDeleteFromBasketMutation,
    useDeleteProductMutation,
    useGetProfileQuery,
    useUpdateOrderItemMutation,
    useUpdateProductMutation,
} from 'store';
import { clientRoutes, getPrice } from 'utils';
import { Image } from '../Image';
import { QuantityFn } from 'widgets';
import { Link } from '..';
import { generatePath } from 'react-router-dom';

const { Text } = Typography;

const fontStyle: React.CSSProperties = { fontSize: 24 };

type CartItemContainerProps = {
    product: Product | null;
    count?: number;
    price?: number;
    itemId?: string;
    canDelete?: boolean;
    height?: string | number;
};

const useControllers = (productDeleted: boolean, count?: number, itemId?: string) => {
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

    const onPlus = () => !productDeleted && !!itemId && !!count && handleCount(itemId, count + 1);
    const onMinus = () => !productDeleted && !!itemId && (!!count && count > 1 ? handleCount(itemId, count - 1) : onDelete(itemId));

    return { onDelete, onPlus, onMinus, loading };
};

type CartItemControlsProps = Omit<CartItemContainerProps, 'product' | 'price' | 'canDelete' | 'height'> & { productDeleted: boolean };

const CartItemControls: React.FC<CartItemControlsProps> = ({ count, itemId, productDeleted }) => {
    const { onDelete, onMinus, onPlus, loading } = useControllers(productDeleted, count, itemId);
    if (!count) return null;
    if (loading) return <Skeleton.Input active size="large" />;

    return (
        <Row align="middle" wrap={false}>
            <Col
                style={{
                    borderRadius: 9,
                    border: '1px solid black',
                    padding: '5px 15px',
                    display: 'flex',
                    gap: 15,
                    cursor: productDeleted ? 'not-allowed' : 'default',
                    color: productDeleted ? 'gray' : 'black',
                }}
            >
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

export const CartItemContainer: React.FC<CartItemContainerProps> = ({ product, price, canDelete, height = 200, ...props }) => {
    const { images, name, id, price: productPrice } = product ?? {};
    const productDeleted = !product;
    const priceStr = productDeleted ? '' : getPrice({ value: price ?? productPrice ?? 0 });

    const [deleteProduct] = useDeleteProductMutation();

    const onDelete = () =>
        product &&
        Modal.confirm({
            title: 'Подтвердите действие',
            content: `Вы действительно хотите удалить товар "${product.name}"?`,
            onOk: () =>
                deleteProduct(product.id)
                    .unwrap()
                    .then(() => message.success('Товар удален'))
                    .catch(console.error),
        });

    const productPath = id ? generatePath(clientRoutes.product, { id }) : '';

    return (
        <Row wrap={false}>
            <Col>
                <Image src={images?.[0] ?? ''} height={height} className={style.cart_item_image} />
            </Col>
            <Col flex="auto" offset={1} style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                <Row>
                    <Col>
                        <Row>
                            <Link to={productPath}>
                                <Text ellipsis strong style={{ ...fontStyle, color: productDeleted ? 'gray' : 'black' }}>
                                    {productDeleted ? 'Товар удален' : name}
                                </Text>
                            </Link>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <CartItemControls {...props} productDeleted={productDeleted} />
                </Row>
            </Col>
            <Col>
                <Row style={{ height: '100%', flexDirection: 'column' }} justify="space-between">
                    <Text strong ellipsis style={fontStyle}>
                        {priceStr}
                    </Text>
                    {canDelete && (
                        <Row justify="end">
                            <CloseOutlined onClick={onDelete} />
                        </Row>
                    )}
                </Row>
            </Col>
        </Row>
    );
};
