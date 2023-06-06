import { Col, Divider, List, Row, Space, Typography } from 'antd';
import { Link, ProductCard } from 'components';
import React from 'react';
import { Order, Product, useGetCategoryQuery, useGetOrderQuery, useGetProductsQuery, useGetProfileQuery } from 'store';
import { clientRoutes, getPrice } from 'utils';

const { Text } = Typography;

export type ProductsWallProps = {
    products?: Product[];
    order?: Order;
    column?: number;
    categoryId?: string;
};

export const ProductsWall: React.FC<ProductsWallProps> = ({ products, order, column = 6, categoryId }) => {
    const { data: category } = useGetCategoryQuery(String(categoryId), { skip: !categoryId || categoryId === 'default' });

    const isOrder = !!order;
    const isCategory = !!products;
    const orderPrice = order?.items?.reduce((acc, item) => acc + item.price, 0);

    const productsPath = category && clientRoutes.getProductsPath(category.id);

    return (
        <React.Fragment>
            <Row style={{ marginBottom: 20 }} justify="space-between">
                <Col>
                    {productsPath && (
                        <Link to={productsPath} style={{ fontSize: 24 }}>
                            {category.name}
                        </Link>
                    )}
                    {isOrder && <Text style={{ fontSize: 24 }}>Заказ № {order.id}</Text>}
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
                        dataSource={order.items}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                                <ProductCard {...item.product} price={item.price} />
                            </List.Item>
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
