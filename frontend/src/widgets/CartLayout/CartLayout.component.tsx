import React from 'react';
import style from './CartLayout.style.module.css';
import { Checkbox, Divider } from 'antd';
import { CartItemContainer } from 'components';

export const CartLayout: React.FC = () => {
    return (
        <div className={style.cart_layout}>
            <div className={style.cart_layout__item}>
                <div style={{ width: 33, height: 33, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Checkbox />
                </div>
                <CartItemContainer />
            </div>
            <Divider />
            <div className={style.cart_layout__item}>
                <div style={{ width: 33, height: 33, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Checkbox />
                </div>
                <CartItemContainer />
            </div>
        </div>
    );
};
