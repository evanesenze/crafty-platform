import React, { useEffect, useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import style from './TinderBlock.style.module.css';
import { Col, Modal, ModalProps, Row, Typography } from 'antd';
import { DislikeTwoTone, LikeTwoTone, QuestionOutlined } from '@ant-design/icons';
import { useGetProductsQuery, useGetProfileQuery, useToggleFavoriteMutation } from 'store';
import { Loading } from 'components';

const { Title, Text } = Typography;

type Direction = 'left' | 'right' | 'up' | 'down';

interface API {
    swipe(dir?: Direction): Promise<void>;
    restoreCard(): Promise<void>;
}

export const TinderBlock: React.FC<ModalProps> = (props) => {
    const { data: products, isFetching, isSuccess } = useGetProductsQuery({});
    const [toggleFavorite] = useToggleFavoriteMutation();
    const { data: profile } = useGetProfileQuery();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const currentIndexRef = useRef<number>(currentIndex);

    const product = products?.[currentIndex];
    const canSwipe = currentIndex >= 0 && currentIndex < Number(products?.length);

    useEffect(() => {
        const index = (products?.length ?? 0) - 1;
        setCurrentIndex(index);
    }, [products]);

    const childRefs = useMemo(
        () =>
            Array(products?.length)
                .fill(0)
                .map(() => React.createRef<API>()),
        [products]
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const swiped = (direction: string, nameToDelete: string, index: number) => {
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name: string, idx: number) => {
        currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard();
    };

    const swipe = async (dir: Direction) => {
        if (canSwipe) {
            await childRefs[currentIndex].current?.swipe(dir);
        }
    };

    const onLike = () => {
        if (product && profile) {
            !profile.favorites.some((item) => item.id === product.id) && toggleFavorite(product.id);
        }
        swipe('right');
    };

    const onDislike = () => {
        if (product && profile) {
            profile.favorites.some((item) => item.id === product.id) && toggleFavorite(product.id);
        }
        swipe('left');
    };

    return (
        <Modal {...props} footer={null}>
            <div className={style.tinder_block}>
                <Title level={3} style={{ textTransform: 'uppercase' }}>
                    Crafty.
                    <span className={style.tinder_title}>Tinder</span>
                </Title>
                {isFetching && <Loading />}
                {isSuccess &&
                    (product ? (
                        <>
                            <div className={style.cardContainer}>
                                {products.map((item, index) => (
                                    <TinderCard
                                        ref={childRefs[index]}
                                        className={style.swipe}
                                        key={item.id}
                                        onSwipe={(dir) => swiped(dir, item.id, index)}
                                        onCardLeftScreen={() => outOfFrame(item.id, index)}
                                        preventSwipe={['up', 'down']}
                                    >
                                        <div
                                            style={{ backgroundImage: 'url(' + item.images[0] + ')', backgroundSize: 'cover' }}
                                            className={style.card}
                                        >
                                            {/* <h3>{item.name}</h3> */}
                                        </div>
                                    </TinderCard>
                                ))}
                            </div>
                            <Row style={{ width: '100%' }}>
                                <Col span={16} offset={4}>
                                    <Title style={{ textAlign: 'center' }} level={4} key={currentIndex} className={style.infoText}>
                                        {product.name}
                                    </Title>
                                </Col>
                            </Row>
                            <Row style={{ width: '100%', height: 65 }}>
                                <Col span={6} offset={4}>
                                    <Row justify="center" align="middle" style={{ height: '100%' }}>
                                        <DislikeTwoTone className={style.button} twoToneColor="red" onClick={onDislike} style={{ fontSize: 50 }} />
                                    </Row>
                                </Col>
                                <Col span={6} offset={4}>
                                    <Row justify="center" align="middle" style={{ height: '100%' }}>
                                        <LikeTwoTone className={style.button} onClick={onLike} style={{ fontSize: 50 }} />
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ borderRadius: '50%', width: 26, height: 26, padding: 5, border: '1px solid black' }}>
                                    <Row justify="center" align="middle" style={{ height: '100%' }}>
                                        <QuestionOutlined style={{ fontSize: 14 }} />
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Row style={{ height: '100%' }} justify="center" align="middle">
                            <Col>
                                <Row>
                                    <Text>Товаров пока нет!</Text>
                                </Row>
                                <Row>
                                    <Text>Приходите позже</Text>
                                </Row>
                            </Col>
                        </Row>
                    ))}
            </div>
        </Modal>
    );
};
