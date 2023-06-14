import { Button, Card, Col, ConfigProvider, Divider, Form, Input, List, Modal, Rate, Row, Skeleton, Space, Typography, message } from 'antd';
import { clientRoutes } from '../utils/config';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Image } from 'components';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { AuthProvider, Comment, Rating } from 'widgets';
import {
    useGetProductQuery,
    useGetReviewsQuery,
    useAddToBasketMutation,
    useToggleFavoriteMutation,
    useGetProfileQuery,
    useCreateReviewMutation,
    CreateReview,
} from 'store';
import { getPrice, requiredRule } from 'utils';

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
                .catch(console.error);
    };

    const toggleBasket = () => {
        product &&
            addToBasketFetch(product.id)
                .unwrap()
                .then(() => {
                    refetch();
                })
                .catch(console.error);
    };
    const inFavorite = useMemo(() => !!profile && profile.favorites.findIndex((item) => item.id === id) !== -1, [profile?.favorites]);
    const inBasket = useMemo(() => !!profile && profile.basket.findIndex((item) => item.product?.id === id) !== -1, [profile?.basket]);
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
    const { data: profile } = useGetProfileQuery();
    const [reviewsOpen, setReviewsOpen] = useState(false);
    const [form] = Form.useForm<Omit<CreateReview, 'product'>>();
    const [createReview, reviewState] = useCreateReviewMutation();

    const rating = useMemo(() => (reviews?.length ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length : 0), [reviews]);
    const price = getPrice({ value: product?.price ?? 0 });

    const onModalClose = () => {
        form.resetFields();
        setReviewsOpen(false);
    };

    const onFinish = (values: Omit<CreateReview, 'product'>) => {
        product &&
            createReview({ ...values, product: product.id })
                .unwrap()
                .then(onModalClose)
                .catch(console.error);
    };

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
                            <Row style={{ marginBottom: 20 }}>
                                <Rating value={rating} disabled />
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
            <Row style={{ margin: '25px 0px 10px' }} align="middle" justify="space-between">
                <Col>
                    <Text strong style={{ fontSize: 34 }}>
                        Отзывы
                    </Text>
                </Col>
                <Col>
                    <AuthProvider>
                        <Button onClick={() => setReviewsOpen(true)}>Оставить отзыв</Button>
                    </AuthProvider>
                </Col>
            </Row>
            <List
                locale={{ emptyText: 'Отзывов еще нет =(' }}
                grid={{ gutter: [40, 30] as any, column: 2 }}
                dataSource={reviews}
                loading={isReviewsFetching}
                renderItem={(item, i) => (
                    <List.Item key={item.id}>
                        <Comment {...item} />
                    </List.Item>
                )}
            />
            <Modal
                open={reviewsOpen}
                title={<Title level={4}>Ваш отзыв</Title>}
                onCancel={onModalClose}
                okButtonProps={{ loading: reviewState.isLoading }}
                onOk={form.submit}
            >
                {!!profile && (
                    <Card>
                        <Form form={form} onFinish={onFinish}>
                            <Card.Meta
                                title={
                                    <Row justify="space-between">
                                        <Col>
                                            <Text strong style={{ fontSize: 20 }}>
                                                {profile.name}
                                            </Text>
                                        </Col>
                                    </Row>
                                }
                                avatar={<Image src={profile.avatar} height="78px" />}
                                description={
                                    <Form.Item name="rating" rules={[requiredRule]}>
                                        <Rate />
                                    </Form.Item>
                                }
                            />
                            <Form.Item name="text" rules={[requiredRule]}>
                                <Input.TextArea style={{ marginTop: 10, fontSize: 16, lineHeight: 1.3 }} />
                            </Form.Item>
                        </Form>
                    </Card>
                )}
            </Modal>
        </React.Fragment>
    ) : null;
};
