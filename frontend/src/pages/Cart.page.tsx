import { Button, Col, Divider, Form, Input, Modal, Row, Skeleton, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { OrderItem, useCreateOrderMutation, useGetProfileQuery } from 'store/apis';
import { CartLayout } from 'widgets';
import { entries, find, reduce, reject, some } from 'lodash';
import { getPrice, requiredRule } from 'utils';
import { NumberInput } from 'components/Input';

const { Title, Text } = Typography;

type OrderDetails = {
    city: string;
    street: string;
    doorway?: string;
    floor?: string;
    flat?: string;
    comment?: string;
};

type OrderDetailKey = keyof OrderDetails;

const oderDetailAlias: Record<OrderDetailKey, string> = {
    city: 'Город',
    street: 'Улица',
    doorway: 'Подъезд',
    floor: 'Этаж',
    flat: 'Квартира',
    comment: 'Комментарий',
};

export const Cart: React.FC = () => {
    const { data: profile, isFetching } = useGetProfileQuery();
    const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
    const [createOrder] = useCreateOrderMutation();
    const [form] = Form.useForm<OrderDetails>();
    const [isModalOpen, setModalOpen] = useState(false);

    const onSelect = (item: OrderItem) => {
        setSelectedItems((x) => (find(x, (x) => x.id === item.id) ? reject(x, (x) => x.id === item.id) : [...x, item]));
    };

    useEffect(() => {
        if (!profile?.basket.length) return;
        setSelectedItems((x) => profile.basket.filter((item) => x.find((y) => y.id === item.id)));
    }, [profile?.basket]);

    const onFinish = async (values: OrderDetails) => {
        const { comment, ...data } = values;
        const address = reduce(
            entries(data),
            (acc, [key, value]) => {
                return value ? acc + `${oderDetailAlias[key as OrderDetailKey]}: ${value}, ` : acc;
            },
            ''
        );
        const items = selectedItems.map((item) => item.id);
        profile &&
            createOrder({ address, comment, buyer: profile.id, seller: profile.id, items, discount: 0 })
                .unwrap()
                .then(() => {
                    message.success('Заказ успешно создан');
                })
                .catch(console.error);
    };

    const onCancel = () => {
        setModalOpen(false);
        form.resetFields();
    };

    const onOpen = () => setModalOpen(true);

    const canCreateOrder = !!selectedItems.length;
    const totalPrice = reduce(selectedItems, (acc, item) => acc + item.price * item.quantity, 0);
    const totalCount = reduce(selectedItems, (acc, item) => acc + item.quantity, 0);
    const price = getPrice({ value: totalPrice });

    return (
        <React.Fragment>
            <Title level={2}>Корзина</Title>
            <Row>
                <Col span={17}>
                    <CartLayout onSelect={onSelect} selectedItems={selectedItems} />
                </Col>
                <Col offset={1} span={6}>
                    <Row style={{ marginBottom: 20 }}>
                        <Button
                            disabled={!canCreateOrder}
                            loading={isFetching}
                            type="primary"
                            block
                            size="large"
                            onClick={onOpen}
                            style={{ height: 74 }}
                        >
                            Перейти к оформлению
                        </Button>
                    </Row>
                    {canCreateOrder &&
                        (isFetching ? (
                            <Skeleton />
                        ) : (
                            <>
                                <Row justify="space-between">
                                    <Text style={{ fontSize: 14 }}>Всего: {totalCount} товара</Text>
                                    <Text style={{ fontSize: 14 }}>{price} </Text>
                                </Row>
                                <Divider />
                                <Row justify="space-between" align={'middle'}>
                                    <Text style={{ fontSize: 24, lineHeight: '24px' }} strong>
                                        Итого:
                                    </Text>
                                    <Text style={{ fontSize: 32 }} strong>
                                        {price}
                                    </Text>
                                </Row>
                            </>
                        ))}
                </Col>
            </Row>
            <Modal open={isModalOpen} title="Уточните детали заказа" okText="Оформить заказ" onOk={form.submit} onCancel={onCancel}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Город" name="city" rules={[requiredRule]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11} offset={2}>
                            <Form.Item label="Адрес" name="street" rules={[requiredRule]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <Form.Item label="Подъезд" name="doorway">
                                <NumberInput min={1} />
                            </Form.Item>
                        </Col>
                        <Col span={8} offset={1}>
                            <Form.Item label="Этаж" name="floor">
                                <NumberInput min={1} />
                            </Form.Item>
                        </Col>
                        <Col span={7} offset={1}>
                            <Form.Item label="Квартира" name="flat">
                                <NumberInput min={1} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Комментарий" name="comment">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </React.Fragment>
    );
};
