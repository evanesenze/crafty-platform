import React from 'react';

export type ImageProps = {
    src: string;
    height?: string;
};

export const Image: React.FC<ImageProps> = ({ src, height = 100 }) => {
    return (
        <div
            style={{
                backgroundImage: `url(${src})`,
                height,
                aspectRatio: '6/5',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        ></div>
    );
};
