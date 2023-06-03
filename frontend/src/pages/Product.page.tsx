import { Button, Col, ConfigProvider, List, Rate, Row, Space, Typography } from 'antd';
import { clientRoutes } from '../utils/config';
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Image } from 'components';
import { HeartOutlined } from '@ant-design/icons';
import { Comment, Rating } from 'widgets';
import { useGetProductQuery, useGetReviewsQuery, useToggleFavoriteMutation } from 'store';
import { getPrice } from 'utils';

export type ProductParams = 'id';

const { Title, Text, Paragraph } = Typography;

export const Product: React.FC = () => {
    const { id } = useParams<ProductParams>();

    const { data: product, isSuccess, refetch, isFetching: isProductFetching } = useGetProductQuery(String(id));
    const { data: reviews, isFetching: isReviewsFetching } = useGetReviewsQuery({ productId: String(id) });
    const [toggleFavorite] = useToggleFavoriteMutation();

    // const rating = reviews?.length ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length : 0;

    const toggle = () => {
        product &&
            toggleFavorite(product.id)
                .unwrap()
                .then(() => {
                    refetch();
                })
                .catch(console.log);
    };

    // if (!isSuccess && !isProductFetching) return <Navigate to={clientRoutes[404]} />;
    return isSuccess ? (
        <React.Fragment>
            <Row style={{ height: 300 }} wrap={false}>
                <Col>
                    <Image src={product.images[0]} height="300px" />
                </Col>
                <Col offset={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Row>
                        <Col>
                            <Title>{product.name}</Title>
                            {/* <Row>{!!rating && <Rating value={rating} disabled />}</Row> */}
                            <Row>
                                <Text style={{ fontSize: 14, color: 'gray' }}>Мастер Анастасия</Text>
                            </Row>
                            <Row>
                                <Paragraph ellipsis={{ rows: 4 }}>{product.description}</Paragraph>
                            </Row>
                        </Col>
                    </Row>
                    <Row align="top" style={{ top: 16, position: 'relative' }}>
                        <Col>
                            <Text strong style={{ fontSize: 32, lineHeight: '32px' }}>
                                {getPrice({ value: product.price })}
                            </Text>
                        </Col>
                        <Col offset={1}>
                            <Space align="start" size={20}>
                                <Col>
                                    <Row>
                                        <ConfigProvider
                                            theme={{ token: { colorText: 'white', colorBgContainer: 'black', colorPrimaryHover: 'white' } }}
                                        >
                                            <Button size="large">В корзину</Button>
                                        </ConfigProvider>
                                    </Row>
                                    <Row justify="center">
                                        <Text style={{ fontSize: 14, color: 'gray', lineHeight: '14px', marginTop: 2 }}>Осталось 2</Text>
                                    </Row>
                                </Col>
                                <Col>
                                    <HeartOutlined onClick={toggle} style={{ fontSize: 36 }} />
                                </Col>
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Title level={2} style={{ marginTop: 25 }}>
                Отзывы
            </Title>
            <List
                locale={{ emptyText: 'Отзывов еще нет =(' }}
                grid={{ gutter: [40, 30] as any, column: 2 }}
                dataSource={reviews}
                loading={isReviewsFetching}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Comment {...item} />
                    </List.Item>
                )}
            />
        </React.Fragment>
    ) : null;
};
