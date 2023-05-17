import React from 'react';
import style from './CartItemContainer.style.module.css';
import { Typography } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

const url = 'https://mobimg.b-cdn.net/v3/fetch/db/db6e862725f8e449427d1de5b2be0835.jpeg';

const { Text } = Typography;

const fontStyle: React.CSSProperties = { fontSize: 24 };

type CartItemContainerProps = {
    imageStyle?: React.CSSProperties;
};

export const CartItemContainer: React.FC<CartItemContainerProps> = ({ imageStyle }) => {
    return (
        <div className={style.cart_item_container}>
            <div className={style.cart_item_image} style={{ backgroundImage: `url(${url})`, ...imageStyle }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text strong style={fontStyle}>
                        Динозавр
                    </Text>
                    <Text style={{ color: '#929292' }}>Мастер Анастасия</Text>
                </div>
                <div>
                    <div style={{ display: 'flex', gap: 15 }}>
                        <div style={{ borderRadius: 9, border: '1px solid black', padding: '5px 15px', display: 'flex', gap: 15 }}>
                            <MinusOutlined />
                            <span>2</span>
                            <PlusOutlined />
                        </div>
                        <CloseOutlined style={{ fontSize: 21 }} />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Text strong ellipsis style={fontStyle}>
                    7 800₽
                </Text>
            </div>
        </div>
    );
};
