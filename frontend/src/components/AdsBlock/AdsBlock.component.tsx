import { Carousel, Image } from 'antd';
import { clientRoutes } from '../../utils/config';
import React, { useMemo, useState } from 'react';
import { Link, generatePath } from 'react-router-dom';

export type AdsBlockProps = {
    containerStyle?: React.CSSProperties;
    images: { category: string; url: string }[];
};

const autoplaySpeed = 7000;

export const AdsBlock: React.FC<AdsBlockProps> = ({ containerStyle, images }) => {
    const [currentAd, setCurrentAd] = useState(0);
    const items = useMemo(() => images.map(({ url }) => <Image key={url} src={url} preview={false} />), [images]);
    const productsPath = generatePath(clientRoutes.getProductsPath(images[currentAd].category));

    return (
        <Link to={productsPath} style={{ overflow: 'hidden', display: 'block', ...containerStyle }}>
            <Carousel autoplaySpeed={autoplaySpeed} autoplay infinite afterChange={setCurrentAd}>
                {items}
            </Carousel>
        </Link>
    );
};
