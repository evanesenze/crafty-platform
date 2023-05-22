import React from 'react';
import style from './Input.style.module.css';
import { Input as AntInput, AutoComplete as AntAutoComplete, InputNumber as AntInputNumber, InputNumberProps, ConfigProvider } from 'antd';
import { ComponentProps } from './types';
import cn from 'classnames';

export const Input: React.FC<ComponentProps> = ({ props, type }) => {
    // const className = cn(style.input, props?.className);
    switch (type) {
        case 'search':
            return (
                <ConfigProvider theme={{ token: { fontSize: 20 } }}>
                    <AntInput.Search {...props} className={props?.className} />
                </ConfigProvider>
            );
        case 'password':
            return (
                <ConfigProvider theme={{ token: { fontSize: 20 } }}>
                    <AntInput.Password {...props} className={props?.className} />
                </ConfigProvider>
            );
        case 'textArea':
            return (
                <ConfigProvider theme={{ token: { fontSize: 20 } }}>
                    <AntInput.TextArea {...props} className={props?.className} />
                </ConfigProvider>
            );
        case 'default':
        default:
            return (
                <ConfigProvider theme={{ token: { fontSize: 20 } }}>
                    <AntInput {...props} className={props?.className} />
                </ConfigProvider>
            );
    }
};

export const AutoComplete: React.FC = ({}) => {
    return (
        <ConfigProvider theme={{ token: { fontSize: 20 } }}>
            <AntAutoComplete />
        </ConfigProvider>
    );
};

export const NumberInput: React.FC<InputNumberProps> = (props) => {
    return (
        <ConfigProvider theme={{ token: { fontSize: 20 } }}>
            <AntInputNumber {...props} style={{ width: '100%', ...props.style }} />
        </ConfigProvider>
    );
};
