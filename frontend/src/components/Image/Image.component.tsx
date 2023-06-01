import React from 'react';

export type ImageProps = {
    src: string;
    height?: string | number;
    className?: string;
};

export const Image: React.FC<ImageProps> = ({ src, height = 100, className }) => {
    return (
        <div
            className={className}
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
