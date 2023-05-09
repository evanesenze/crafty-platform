import React from 'react';
import style from './Logo.style.module.css';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export type LogoProps = {
    to?: string;
    className?: string;
};

export const Logo: React.FC<LogoProps> = ({ to = '/', className }) => {
    return (
        <div className={cn(style.logo, className)}>
            <Link to={to}>Crafty</Link>
        </div>
    );
};
