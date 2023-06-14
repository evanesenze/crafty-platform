import { AutoComplete, Button, Col, ConfigProvider, Form, Input, Row, Typography, message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { NumberInput } from 'components';
import React, { useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useCreateProductMutation, useGetCategoriesQuery } from 'store';
import { clientRoutes } from 'utils/config';
import { requiredRule } from 'utils/rules';
import { PicturesWall } from 'widgets';

const { Title } = Typography;

const searchFilter = (search: string, arr: OptionsType, limit = 5) => {
    const regExp = new RegExp(search, 'gi');
    return arr?.filter((item) => regExp.test(String(item.label))).slice(0, limit);
};

const requiredFiled = [requiredRule];

const filesLimit = 8;

export type OptionsType = DefaultOptionType[] | undefined;

export const Create: React.FC = () => {
    const { data: categories } = useGetCategoriesQuery({});
    const [createProduct] = useCreateProductMutation();
    const [search, setSearch] = useState('');
    const [fileList, setFileList] = useState<File[]>([]);
    const [form] = Form.useForm();
    const nav = useNavigate();

    const options = useMemo<OptionsType>(() => categories?.map(({ name }) => ({ value: name, label: name })), [categories]);
    const filteredOptions = useMemo(() => searchFilter(search, options), [options, search]);

    const resetCreate = () => {
        form.resetFields();
        setFileList([]);
        setSearch('');
    };

    const onFinish = (values: any) => {
        const body = new FormData();
        body.append('name', values.name);
        body.append('category', values.category);
        body.append('price', values.price);
        body.append('description', values.description);
        fileList.forEach((file) => body.append('images', file));
        createProduct(body)
            .unwrap()
            .then(({ id }) => {
                message.success('Товар успешно создан');
                resetCreate();
                nav(generatePath(clientRoutes.product, { id }));
            })
            .catch(console.error);
    };

    const picturesWallLabel = `Галерея ${fileList.length} из ${filesLimit}`;

    return (
        <React.Fragment>
            <Title level={2}>Создание товара</Title>
            <Form form={form} layout="vertical" style={{ width: '100%' }} onFinish={onFinish}>
                <Row style={{ width: '100%' }}>
                    <Col span={8}>
                        <Form.Item label="Название" name="name" rules={requiredFiled}>
                            <Input maxLength={100} showCount />
                        </Form.Item>
                        <Form.Item label="Категория" name="category" rules={requiredFiled}>
                            <AutoComplete options={filteredOptions} onSearch={setSearch} searchValue={search} />
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col span={11}>
                                    <Form.Item label="Цена" name="price" rules={requiredFiled}>
                                        <NumberInput min={0} addonAfter="₽" />
                                    </Form.Item>
                                </Col>
                                <Col hidden offset={2} span={11}>
                                    <Form.Item label="Количество">
                                        <NumberInput min={0} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item label="Описание" name="description" rules={requiredFiled}>
                            <Input.TextArea rows={4} showCount maxLength={300} />
                        </Form.Item>
                    </Col>
                    <Col offset={4} span={12}>
                        <Form.Item label={picturesWallLabel} required>
                            <PicturesWall setValue={setFileList} maxCount={filesLimit} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col offset={9} span={6}>
                        <ConfigProvider theme={{ token: { colorText: 'white', colorBgContainer: 'black' } }}>
                            <Button block size="large" htmlType="submit">
                                Создать
                            </Button>
                        </ConfigProvider>
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    );
};
