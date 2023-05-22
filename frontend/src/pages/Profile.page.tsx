import { Divider, Rate, Space, Typography } from 'antd';
import { CartItemContainer, Image } from 'components';
import React from 'react';
import { Rating } from 'widgets';

const { Text } = Typography;

const avatar =
    'https://get.pxhere.com/photo/man-person-people-hair-male-portrait-facial-expression-smile-beard-senior-citizen-face-sunglasses-eye-glasses-head-eyewear-portrait-photography-facial-hair-vision-care-13412.jpg';

export const Profile: React.FC = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 4fr', gap: 20 }}>
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', height: 200, gap: 15, marginBottom: 40 }}>
                    <Image src={avatar} height="200px" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text strong ellipsis style={{ fontSize: 32 }}>
                            Петр Иванов
                        </Text>
                        <Text strong style={{ fontSize: 14, color: 'gray' }}>
                            Изменить профиль
                        </Text>
                        <Rating value={4.99} disabled />
                        <Text strong>26 отзывов</Text>
                    </div>
                </div>
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
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 25,
                    border: '1px solid black',
                    padding: '25px 15px',
                    borderRadius: 10,
                    height: 'fit-content',
                }}
            >
                <Text>Мои товары</Text>
                <CartItemContainer imageStyle={{ aspectRatio: '6/5' }} />
                <CartItemContainer imageStyle={{ aspectRatio: '6/5' }} />
            </div>
        </div>
    );
};
