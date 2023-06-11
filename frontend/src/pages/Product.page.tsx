import { Button, Col, ConfigProvider, List, Rate, Row, Skeleton, Space, Typography, message } from 'antd';
import { clientRoutes } from '../utils/config';
import React, { useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Image } from 'components';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { AuthProvider, Comment, Rating } from 'widgets';
import { useGetProductQuery, useGetReviewsQuery, useAddToBasketMutation, useToggleFavoriteMutation, useGetProfileQuery } from 'store';
import { getPrice } from 'utils';

export type ProductParams = 'id';

const { Title, Text, Paragraph } = Typography;

export const ProductControls = () => {
    const { id } = useParams<ProductParams>();
    const { data: product, refetch } = useGetProductQuery(String(id));
    const { data: profile, isFetching: isProfileFetching } = useGetProfileQuery();
    const [toggleFavoriteFetch, favoriteState] = useToggleFavoriteMutation();
    const [addToBasketFetch, basketState] = useAddToBasketMutation();

    const loading = favoriteState.isLoading || basketState.isLoading || isProfileFetching;

    const toggleFavorite = () => {
        product &&
            toggleFavoriteFetch(product.id)
                .unwrap()
                .then(() => {
                    message.success(`Товар ${inFavorite ? 'убран из избранного' : 'добавлен в избранное'}`);
                    refetch();
                })
                .catch(console.log);
    };

    const toggleBasket = () => {
        product &&
            addToBasketFetch(product.id)
                .unwrap()
                .then(() => {
                    refetch();
                })
                .catch(console.log);
    };

    const inFavorite = useMemo(() => !!profile && profile.favorites.findIndex((item) => item.id === id) !== -1, [profile?.favorites]);
    const inBasket = useMemo(() => !!profile && profile.basket.findIndex((item) => item.product.id === id) !== -1, [profile?.basket]);
    const HearIcon = inFavorite ? HeartTwoTone : HeartOutlined;

    if (loading) {
        return <Skeleton.Input size="large" active style={{ marginBottom: 16 }} />;
    }

    return (
        <AuthProvider>
            <Row style={{ display: 'flex' }} wrap={false}>
                <Col>
                    <Row style={{ marginBottom: 16 }}>
                        <ConfigProvider theme={{ token: { colorText: 'white', colorBgContainer: 'black', colorPrimaryHover: 'white' } }}>
                            <Button size="large" disabled={inBasket} onClick={toggleBasket} loading={basketState.isLoading}>
                                {inBasket ? 'Товар в корзине' : 'В корзину'}
                            </Button>
                        </ConfigProvider>
                    </Row>
                    {/* <Row justify="center">
                        <Text style={{ fontSize: 14, color: 'gray', lineHeight: '14px', marginTop: 2 }}>Осталось 2</Text>
                    </Row> */}
                </Col>
                <Col offset={2}>
                    <HearIcon onClick={toggleFavorite} twoToneColor={'red'} style={{ fontSize: 36 }} />
                </Col>
            </Row>
        </AuthProvider>
    );
};

export const Product: React.FC = () => {
    const { id } = useParams<ProductParams>();
    const { data: product, isSuccess, isFetching: isProductFetching } = useGetProductQuery(String(id));
    const { data: reviews, isFetching: isReviewsFetching } = useGetReviewsQuery({ productId: String(id) });

    const rating = useMemo(() => (reviews?.length ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length : 0), [reviews]);
    const price = getPrice({ value: product?.price ?? 0 });

    if (!isSuccess && !isProductFetching) return <Navigate to={clientRoutes[404]} />;
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
                            <Row>{!!rating && <Rating value={rating} disabled />}</Row>
                            <Row>
                                <Text style={{ fontSize: 14, color: 'gray' }}>Мастер Анастасия</Text>
                            </Row>
                            <Row>
                                <Paragraph ellipsis={{ rows: 4 }}>{product.description}</Paragraph>
                            </Row>
                        </Col>
                    </Row>
                    <Row wrap={false} align="top" style={{ top: 16, position: 'relative' }}>
                        <Col>
                            <Text strong style={{ fontSize: 32, lineHeight: '32px', whiteSpace: 'nowrap' }}>
                                {price}
                            </Text>
                        </Col>
                        <Col offset={1}>
                            <ProductControls />
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
