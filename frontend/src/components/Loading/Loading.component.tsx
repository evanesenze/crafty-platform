import { LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider, Row } from 'antd';
import React from 'react';

export const Loading: React.FC = () => {
    return (
        <ConfigProvider>
            <Row justify="center" align="middle" style={{ height: '100%' }}>
                <LoadingOutlined />
            </Row>
        </ConfigProvider>
    );
};
