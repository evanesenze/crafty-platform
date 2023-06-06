import { AutoComplete, Button, Col, ConfigProvider, Form, Input, Row, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { NumberInput } from 'components';
import React, { useMemo, useState } from 'react';
import { useGetCategoriesQuery } from 'store';
import { PicturesWall } from 'widgets';

const { Title } = Typography;

const searchFilter = (search: string, arr: OptionsType, limit = 5) => {
    const regExp = new RegExp(search, 'gi');
    return arr?.filter((item) => regExp.test(String(item.label))).slice(0, limit);
};

export type OptionsType = DefaultOptionType[] | undefined;

export const Create: React.FC = () => {
    const { data: categories } = useGetCategoriesQuery({});
    const [search, setSearch] = useState('');

    const options = useMemo<OptionsType>(() => categories?.map((item) => ({ value: item.id, label: item.name })), [categories]);
    const filteredOptions = useMemo(() => searchFilter(search, options), [options, search]);

    return (
        <React.Fragment>
            <Title level={2}>Создание товара</Title>
            <Form layout="vertical" style={{ width: '100%' }}>
                <Row style={{ width: '100%' }}>
                    <Col span={8}>
                        <Form.Item label="Название">
                            <Input maxLength={100} showCount />
                        </Form.Item>
                        <Form.Item label="Категория">
                            <AutoComplete options={filteredOptions} onSearch={setSearch} searchValue={search} />
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="Цена">
                                        <NumberInput min={0} addonAfter="₽" />
                                    </Form.Item>
                                </Col>
                                <Col offset={2} span={11}>
                                    <Form.Item label="Количество">
                                        <NumberInput min={0} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item label="Описание">
                            <Input.TextArea rows={4} showCount maxLength={300} />
                        </Form.Item>
                    </Col>
                    <Col offset={4} span={12}>
                        <Form.Item label="Галерея">
                            <PicturesWall />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col offset={9} span={6}>
                        <ConfigProvider theme={{ token: { colorText: 'white', colorBgContainer: 'black' } }}>
                            <Button block size="large">
                                Создать
                            </Button>
                        </ConfigProvider>
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    );
};
