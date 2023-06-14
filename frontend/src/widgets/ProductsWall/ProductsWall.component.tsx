import { Col, Divider, List, Row, Space, Typography } from 'antd';
import { Link, ProductCard } from 'components';
import React from 'react';
import { Order, Product, useGetCategoryQuery, useGetOrderQuery, useGetProductsQuery, useGetProfileQuery } from 'store';
import { clientRoutes, getPrice } from 'utils';

const { Text } = Typography;
const numberPattern = /\d+/g;

export type ProductsWallProps = {
    products?: Product[];
    order?: Order;
    column?: number;
    categoryId?: string;
    title?: string;
};

export const ProductsWall: React.FC<ProductsWallProps> = ({ products, order, column = 6, categoryId, title }) => {
    const { data: category } = useGetCategoryQuery(String(categoryId), { skip: !categoryId || categoryId === 'default' });

    const isOrder = !!order;
    const isCategory = !!products;
    const orderPrice = order?.items?.reduce((acc, item) => acc + item.price, 0);
    const productsPath = category && clientRoutes.getProductsPath(category.id);
    const orderNumber = order?.id.match(numberPattern)?.join('');

    return (
        <React.Fragment>
            <Row style={{ marginBottom: 20 }} justify="space-between">
                <Col>
                    {productsPath && (
                        <Link to={productsPath} style={{ fontSize: 24 }}>
                            {category.name}
                        </Link>
                    )}
                    {isOrder && <Text style={{ fontSize: 24 }}>Заказ № {orderNumber}</Text>}
                    {title && (
                        <Text strong style={{ fontSize: 32 }}>
                            {title}
                        </Text>
                    )}
                </Col>
                <Col>{isOrder && <Text>{order.status}</Text>}</Col>
            </Row>
            {isOrder && (
                <React.Fragment>
                    <Row>
                        <Col>
                            <Text strong style={{ fontSize: 24 }}>
                                {orderPrice && getPrice({ value: orderPrice })}
                            </Text>
                        </Col>
                    </Row>
                    <List
                        grid={{ column, gutter: 20 }}
                        dataSource={order.items}
                        renderItem={({ id, product, price }) => (
                            <List.Item key={id}>{!!product && <ProductCard {...product} price={price} />}</List.Item>
                        )}
                    />
                </React.Fragment>
            )}
            {isCategory && (
                <List
                    grid={{ column, gutter: 20 }}
                    dataSource={products}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <ProductCard {...item} />
                        </List.Item>
                    )}
                />
            )}
            <Divider />
        </React.Fragment>
    );
};
