import { Rate, Space, Typography, RateProps } from 'antd';
import React from 'react';

const { Text } = Typography;

export type RatingProps = RateProps & {
    withText?: boolean;
    value: number;
};

export const Rating: React.FC<RatingProps> = ({ withText, value, ...rateProps }) => {
    const text = value.toFixed(1);
    return (
        <Space>
            <Text strong>{text}</Text>
            <Rate value={value} allowHalf {...rateProps} />
        </Space>
    );
};
