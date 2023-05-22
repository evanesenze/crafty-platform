import { SearchProps, InputProps, PasswordProps, TextAreaProps } from 'antd/es/input';

export type DefaultComponentProps = {
    type?: 'default';
    props?: InputProps;
};

export type SearchComponentProps = {
    type: 'search';
    props?: SearchProps;
};

export type PasswordComponentProps = {
    type: 'password';
    props?: PasswordProps;
};

export type TextAreaComponentProps = {
    type: 'textArea';
    props?: TextAreaProps;
};

export type ComponentProps = DefaultComponentProps | SearchComponentProps | PasswordComponentProps | TextAreaComponentProps;

export type InputType = ComponentProps['type'];
