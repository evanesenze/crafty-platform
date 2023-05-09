import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
import cn from 'classnames';
import style from './CategoriesButton.style.module.css';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];

export type CategoriesButtonProps = {
    className?: string;
};

export const CategoriesButton: React.FC<CategoriesButtonProps> = (props) => {
    const className = cn(style.categories_button, props.className);
    return (
        <Dropdown className={className} menu={{ items, className: style.categories_button__list }} placement="bottomLeft">
            <Space>
                <MenuOutlined />
                <span>Категории</span>
            </Space>
        </Dropdown>
    );
};
