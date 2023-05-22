import { Col, Row, Space, Typography } from 'antd';
import { ProductCard } from 'components';
import React from 'react';

const { Text } = Typography;
const url = 'https://detskiy-sad.com/wp-content/uploads/2016/09/kartinki-na-shkafchiki-s-igrushkami-22.jpg';
const price = 10000;

export type ProductsWallProps = {
    count: number;
    isCategory?: boolean;
    isOrder?: boolean;
};

export const ProductsWall: React.FC<ProductsWallProps> = ({ count, isCategory, isOrder }) => {
    return (
        <React.Fragment>
            <Row justify="space-between">
                <Col>
                    {isOrder && <Text style={{ fontSize: 24 }}>Заказ № 2344831</Text>}
                    {isCategory && <Text style={{ fontSize: 24 }}>Укарашения</Text>}
                </Col>
                <Col>{isOrder && <Text>В пути</Text>}</Col>
            </Row>
            {isOrder && (
                <Row>
                    <Col>
                        <Text strong style={{ fontSize: 24 }}>
                            44 000 ₽
                        </Text>
                    </Col>
                </Row>
            )}
            <Row style={{ overflowY: 'hidden', overflowX: 'auto', margin: '20px -70px 0', padding: '0 70px' }}>
                <Space size={45}>
                    {new Array(count).fill(<ProductCard id="product-slug" url={url} price={price} text="Набор столовых приборов" />)}
                </Space>
            </Row>
        </React.Fragment>
    );
};
