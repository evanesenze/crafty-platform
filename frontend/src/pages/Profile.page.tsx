import { Col, Divider, List, Rate, Row, Space, Typography } from 'antd';
import { CartItemContainer, Image } from 'components';
import React from 'react';
import { useGetProductsQuery, useGetProfileQuery } from 'store';
import { AuthProvider, Rating } from 'widgets';

const { Text } = Typography;

const avatar =
    'https://get.pxhere.com/photo/man-person-people-hair-male-portrait-facial-expression-smile-beard-senior-citizen-face-sunglasses-eye-glasses-head-eyewear-portrait-photography-facial-hair-vision-care-13412.jpg';

export const Profile: React.FC = () => {
    const { data: profile, isSuccess: isSuccessProfile } = useGetProfileQuery();
    const ownerId = profile?.id;
    const { data: products, isFetching } = useGetProductsQuery({ ownerId }, { skip: !ownerId });

    return isSuccessProfile ? (
        <Row>
            <Col span={10}>
                <Row style={{ marginBottom: 40 }} wrap={false}>
                    <Col>
                        <Image src={profile.avatar} height="200px" />
                    </Col>
                    <Col offset={1}>
                        <Row>
                            <Text strong style={{ fontSize: 32 }}>
                                {profile.name}
                            </Text>
                        </Row>
                        <Row>
                            <Text strong style={{ fontSize: 14, color: 'gray' }}>
                                Изменить профиль
                            </Text>
                            <Rating value={4.99} disabled />
                            <Text strong>26 отзывов</Text>
                        </Row>
                    </Col>
                </Row>
                <Space size={16} direction="vertical">
                    <Text strong>Личная информация</Text>
                    <Text>Баланс средств</Text>
                    <Text>Сохраненные карты </Text>
                    <Text>Мои данные</Text>
                    <Text>Защита профиля</Text>
                </Space>
                <Divider />
                <Space size={16} direction="vertical">
                    <Text strong>Заказы</Text>
                    <Text>Моя корзина</Text>
                    <Text>Мои заказы</Text>
                    <Text>Мои возвраты</Text>
                    <Text>Купленные товары</Text>
                    <Text>Электронные чеки</Text>
                </Space>
                <Divider />
                <Space size={16} direction="vertical">
                    <Text strong>Магазин</Text>
                    <Text>Мои товары</Text>
                </Space>
            </Col>
            <Col
                offset={1}
                span={13}
                style={{
                    border: '1px solid black',
                    padding: '25px 15px',
                    borderRadius: 10,
                    height: 'fit-content',
                    overflow: 'hidden',
                }}
            >
                <Text>Мои товары</Text>
                <List
                    locale={{ emptyText: 'У пользователя нет товаров' }}
                    loading={isFetching}
                    dataSource={products}
                    itemLayout="vertical"
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <CartItemContainer product={item} />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    ) : null;
};
