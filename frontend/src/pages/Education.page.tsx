import { Col, Image, List, Row, Typography } from 'antd';
import React from 'react';
import ReactPlayer from 'react-player/youtube';

const { Title } = Typography;

export type EducationItem = {
    id: string;
    url: string;
    title: string;
    description: string;
};

const data: EducationItem[] = [
    {
        id: '0',
        description: 'Обучающее видео для детей',
        title: '25 КРУТЫХ И ПРОСТЫХ ПОДЕЛОК ДЛЯ ДЕТЕЙ',
        url: 'https://www.youtube.com/watch?v=rajG-fNa7OU',
    },
    {
        id: '1',
        description: 'Видео про эпоксидную смолу',
        title: 'Удивительный стол из цветов и эпоксидной смолы',
        url: 'https://www.youtube.com/watch?v=AsopsTPbnwM',
    },
    {
        id: '2',
        description: 'Вдохновение',
        title: 'Путь к творчеству Мастер на все руки Вдохновение',
        url: 'https://www.youtube.com/watch?v=xDnhGP9Uv70',
    },
    {
        id: '3',
        description: 'Делимся секретами',
        title: 'СЕКРЕТЫ РУКОДЕЛИЯ',
        url: 'https://www.youtube.com/watch?v=Oal258Ac03g',
    },
];

export const Education: React.FC = () => {
    return (
        <React.Fragment>
            <Title level={2}>Видео</Title>
            <Row>
                <Col span={20} offset={2}>
                    <List
                        itemLayout="vertical"
                        grid={{ column: 3, gutter: [20, 30] as any }}
                        size="large"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.id} extra={<ReactPlayer width={300} height={200} url={item.url} />}>
                                <List.Item.Meta title={item.title} description={item.description} />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};
