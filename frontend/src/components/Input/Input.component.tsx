import React from 'react';
import style from './Input.style.module.css';
import { Input as AntInput } from 'antd';
import { ComponentProps } from './types';
import cn from 'classnames';

export const Input: React.FC<ComponentProps> = ({ props, type }) => {
    const className = cn(style.input, props?.className);
    switch (type) {
        case 'search':
            return <AntInput.Search {...props} className={className} />;
        case 'default':
        default:
            return <AntInput {...props} className={className} />;
    }
};
