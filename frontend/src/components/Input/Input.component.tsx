import React from 'react';
import { AutoComplete as AntAutoComplete, InputNumber as AntInputNumber, InputNumberProps, ConfigProvider } from 'antd';

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
