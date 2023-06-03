import { Card, Col, ConfigProvider, Row, Typography } from 'antd';
import { Image } from 'components';
import React from 'react';
import { Review } from 'store';
import { Rating } from 'widgets';

const avatar =
    'https://get.pxhere.com/photo/man-person-people-hair-male-portrait-facial-expression-smile-beard-senior-citizen-face-sunglasses-eye-glasses-head-eyewear-portrait-photography-facial-hair-vision-care-13412.jpg';

const { Text, Paragraph } = Typography;

export const Comment: React.FC<Review> = ({ rating, text }) => {
    return (
        <ConfigProvider theme={{ token: { colorBorderSecondary: 'black', colorLink: 'gray', colorLinkHover: 'darkgray', colorLinkActive: 'black' } }}>
            <Card>
                <Card.Meta
                    title={
                        <Row justify="space-between">
                            <Col>
                                <Text strong style={{ fontSize: 20 }}>
                                    Петр Иванов
                                </Text>
                            </Col>
                            <Col>
                                <Text style={{ fontSize: 14, color: 'gray' }}>15.04.2023</Text>
                            </Col>
                        </Row>
                    }
                    avatar={<Image src={avatar} height="78px" />}
                    description={<Rating value={rating} disabled />}
                />
                <Paragraph style={{ marginTop: 10, fontSize: 16, lineHeight: 1.3 }} ellipsis={{ rows: 3, expandable: true }}>
                    {text}
                </Paragraph>
            </Card>
        </ConfigProvider>
    );
};
