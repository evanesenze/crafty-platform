import { Col, Divider, List, Modal, Rate, Row, Space, Typography } from 'antd';
import { CartItemContainer, Image, Link } from 'components';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useGetProfileQuery } from 'store';
import { clientRoutes } from 'utils/config';
import { Rating } from 'widgets';

const { Text } = Typography;

const avatar =
    'https://get.pxhere.com/photo/man-person-people-hair-male-portrait-facial-expression-smile-beard-senior-citizen-face-sunglasses-eye-glasses-head-eyewear-portrait-photography-facial-hair-vision-care-13412.jpg';

export const Profile: React.FC = () => {
    const { data: profile, isSuccess: isSuccessProfile } = useGetProfileQuery();
    const { logout } = useAuth();
    const ownerId = profile?.id;
    const { data: products, isFetching } = useGetProductsQuery({ ownerId }, { skip: !ownerId });
    const nav = useNavigate();

    const onLogout = () =>
        Modal.confirm({
            title: 'Подтвердите действие',
            content: 'Вы действительно хотите выйти?',
            onOk: () => {
                logout();
                nav(clientRoutes.home);
            },
        });

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
                            <Col>
                                <Row>
                                    <Text strong style={{ cursor: 'pointer', fontSize: 14, color: 'gray', marginBottom: 5 }}>
                                        Изменить профиль
                                    </Text>
                                </Row>
                                <Row>
                                    <Text onClick={onLogout} strong style={{ cursor: 'pointer', fontSize: 14, color: 'gray' }}>
                                        Выйти
                                    </Text>
                                </Row>
                                {/* <Row>
                                    <Rating value={4.99} disabled />
                                </Row>
                                <Row>
                                    <Text strong>26 отзывов</Text>
                                </Row> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Space size={16} direction="vertical">
                            <Text strong>Личная информация</Text>
                            <Link to="">Баланс средств</Link>
                            <Link to="">Сохраненные карты </Link>
                            <Link to="">Мои данные</Link>
                            <Link to="">Защита профиля</Link>
                        </Space>
                        <Divider />
                        <Space size={16} direction="vertical">
                            <Text strong>Заказы</Text>
                            <Link to="">Моя корзина</Link>
                            <Link to="">Мои заказы</Link>
                            <Link to="">Мои возвраты</Link>
                            <Link to="">Купленные товары</Link>
                            <Link to="">Электронные чеки</Link>
                        </Space>
                    </Col>
                </Row>
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
                <Text strong>Мои товары</Text>
                <List
                    locale={{ emptyText: 'У пользователя нет товаров' }}
                    loading={isFetching}
                    dataSource={products}
                    itemLayout="vertical"
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <CartItemContainer product={item} canDelete height={125} />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    ) : null;
};
