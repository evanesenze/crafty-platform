import { Button, Col, ConfigProvider, List, Rate, Row, Space, Typography } from 'antd';
import { clientRoutes } from '../config';
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Image } from 'components';
import { HeartOutlined, LikeOutlined } from '@ant-design/icons';
import { Comment, Rating } from 'widgets';

export type ProductParams = 'id';

const url = 'https://mobimg.b-cdn.net/v3/fetch/db/db6e862725f8e449427d1de5b2be0835.jpeg';
const { Title, Text, Paragraph } = Typography;

export const Product: React.FC = () => {
    const { id } = useParams<ProductParams>();
    if (!id) return <Navigate to={clientRoutes[404]} />;
    return (
        <React.Fragment>
            <Row style={{ height: 300 }} wrap={false}>
                <Col>
                    <Image src={url} height="300px" />
                </Col>
                <Col offset={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Row>
                        <Col>
                            <Title>Глиняная ваза</Title>
                            <Row>
                                <Rating value={5} disabled />
                            </Row>
                            <Row>
                                <Text style={{ fontSize: 14, color: 'gray' }}>Мастер Анастасия</Text>
                            </Row>
                            <Row>
                                <Paragraph ellipsis={{ rows: 4 }}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, reiciendis consequatur? Asperiores esse quisquam
                                    vel, amet molestiae accusantium debitis vitae veniam vero placeat. Nam, aliquam quisquam perspiciatis distinctio
                                    quaerat quas. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus sint voluptas, dicta, dolores
                                    ullam quasi atque deserunt possimus sed adipisci et necessitatibus corrupti culpa sequi! Voluptatem amet placeat
                                    voluptates repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad placeat earum sequi sunt. Nostrum
                                    sunt similique itaque veritatis dolore quibusdam explicabo. Eos, nihil? Autem ullam nobis molestiae debitis
                                    reiciendis a!
                                </Paragraph>
                            </Row>
                        </Col>
                    </Row>
                    <Row align="top">
                        <Col>
                            <Text strong style={{ fontSize: 32, lineHeight: '32px' }}>
                                32 500 ₽
                            </Text>
                        </Col>
                        <Col offset={1}>
                            <Space align="start" size={20}>
                                <Col>
                                    <Row>
                                        <ConfigProvider
                                            theme={{ token: { colorText: 'white', colorBgContainer: 'black', colorPrimaryHover: 'white' } }}
                                        >
                                            <Button size="large">В корзину</Button>
                                        </ConfigProvider>
                                    </Row>
                                    <Row justify="center">
                                        <Text style={{ fontSize: 14, color: 'gray', lineHeight: '14px', marginTop: 2 }}>Осталось 2</Text>
                                    </Row>
                                </Col>
                                <Col>
                                    <HeartOutlined style={{ fontSize: 36 }} />
                                </Col>
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Title level={2} style={{ marginTop: 25 }}>
                Отзывы
            </Title>
            <List
                grid={{ gutter: [40, 30] as any, column: 2 }}
                dataSource={[1, 2, 3, 4, 5, 6]}
                renderItem={(item, index) => (
                    <List.Item>
                        <Comment />
                    </List.Item>
                )}
            />
        </React.Fragment>
    );
};
