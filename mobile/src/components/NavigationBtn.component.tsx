import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconProps } from '../icons/Cart.icon';
import { ViewType } from './Layout.component';

export interface INavigationBtnProps {
  type: ViewType;
  Icon: React.FC<IconProps>;
  isCurrent?: boolean;
  onClick(type: ViewType): void;
}

const buttonsName: Record<ViewType, string> = {
  Auth: 'Auth',
  Cart: 'Корзина',
  Home: 'Главная',
  Orders: 'Заказы',
  Profile: 'Профиль',
};

const NavigationBtn: React.FC<INavigationBtnProps> = ({ Icon, type, isCurrent, onClick }) => {
  return (
    <View
      style={{
        ...styles.navigationItem,
        ...(isCurrent ? styles.selectedNavigationItem : undefined),
      }}
      onTouchStart={() => onClick(type)}
    >
      <Icon size={26} fill={isCurrent} />
      {isCurrent && <Text style={styles.navigationText}>{buttonsName[type]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationText: {
    color: 'white',
    fontSize: 8,
  },
  navigationItem: {
    width: '20%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    paddingTop: '3%',
    marginRight: '2.5%',
    marginLeft: '2.5%',
    transition: 1,
  },
  selectedNavigationItem: {
    borderTopColor: 'white',
  },
});

export default NavigationBtn;
