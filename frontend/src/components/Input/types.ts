import { SearchProps, InputProps } from 'antd/es/input';

export type DefaultComponentProps = {
    type?: 'default';
    props?: InputProps;
};

export type SearchComponentProps = {
    type: 'search';
    props?: SearchProps;
};

export type ComponentProps = DefaultComponentProps | SearchComponentProps;

export type InputType = ComponentProps['type'];
