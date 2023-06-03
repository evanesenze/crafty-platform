import { MenuOutlined } from '@ant-design/icons';
import { Divider, Drawer, Input, Row } from 'antd';
import React, { useState } from 'react';
import cn from 'classnames';
import style from './CategoriesButton.style.module.css';
import { CategoriesList } from '../CategoriesList';

export type CategoriesButtonProps = {
    className?: string;
};

export const CategoriesButton: React.FC<CategoriesButtonProps> = (props) => {
    const className = cn(style.categories_button, props.className);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [search, setSearch] = useState('');

    const onClose = () => setDrawerOpen(false);

    return (
        <Row align="middle" style={{ height: '100%' }}>
            <MenuOutlined className={className} onClick={() => setDrawerOpen((x) => !x)} />
            <Drawer title="Все категории" placement="left" onClose={onClose} closable={false} open={drawerOpen}>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Украшения" />
                <Divider />
                <CategoriesList mode="vertical" onSelect={onClose} search={search} />
            </Drawer>
        </Row>
    );
};
