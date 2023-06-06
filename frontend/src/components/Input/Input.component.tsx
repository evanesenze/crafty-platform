import React from 'react';
import { InputNumber as AntInputNumber, InputNumberProps, ConfigProvider } from 'antd';

export const NumberInput: React.FC<InputNumberProps> = (props) => {
    return (
        <ConfigProvider theme={{ token: { fontSize: 20 } }}>
            <AntInputNumber {...props} style={{ width: '100%', ...props.style }} />
        </ConfigProvider>
    );
};
