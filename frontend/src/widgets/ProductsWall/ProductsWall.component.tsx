import { Col, List, Row, Space, Typography } from 'antd';
import { ProductCard } from 'components';
import React from 'react';
import { Order, Product, useGetOrderQuery, useGetProductsQuery, useGetProfileQuery } from 'store';
import { getPrice } from 'utils';

const { Text } = Typography;

export type ProductsWallProps = {
    products?: Product[];
    order?: Order;
    column?: number;
    title?: string;
};

export const ProductsWall: React.FC<ProductsWallProps> = ({ products, order, column = 6, title }) => {
    const isOrder = !!order;
    const isCategory = !!products;
    const orderPrice = order?.items?.reduce((acc, item) => acc + item.price, 0);

    return (
        <React.Fragment>
            <Row style={{ marginBottom: 20 }} justify="space-between">
                <Col>
                    {title && <Text style={{ fontSize: 24 }}>{title}</Text>}
                    {/* {isOrder && <Text style={{ fontSize: 24 }}>Заказ № 2344831</Text>} */}
                    {/* {isCategory && <Text style={{ fontSize: 24 }}>Украшения</Text>} */}
                </Col>
                <Col>{isOrder && <Text>В пути</Text>}</Col>
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
        </React.Fragment>
    );
};
