import React, { PropsWithChildren } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

const linkStyle: React.CSSProperties = { textDecoration: 'underline', color: 'black' };

export const Link: React.FC<PropsWithChildren<LinkProps>> = ({ children, ...props }) => {
    const style = { ...linkStyle, ...props.style };
    return (
        <RouterLink {...props} style={style}>
            {children}
        </RouterLink>
    );
};
