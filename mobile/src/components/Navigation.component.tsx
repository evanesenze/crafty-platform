import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, TabNavigationState } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, View } from 'react-native';
import { useAppSelector } from '../hooks/useApp';
import CartIcon from '../icons/Cart.icon';
import HomeIcon from '../icons/Home.icon';
import OrdersIcon from '../icons/Orders.icon';
import ProfileIcon from '../icons/Profile.icon';
import { AppParamsList } from './Layout.component';
import NavigationBtn, { INavigationBtnProps } from './NavigationBtn.component';
import { Icon, Text } from '@rneui/base';
import { useAddToBasketMutation, useGetProfileQuery } from '../store';
import Loading from './Loading.component';

const buttons: Omit<INavigationBtnProps, 'onClick'>[] = [
  { Icon: HomeIcon, type: 'Home' },
  { Icon: OrdersIcon, type: 'Orders' },
  { Icon: CartIcon, type: 'Cart' },
  { Icon: ProfileIcon, type: 'Profile' },
];

export interface INavigationProps extends BottomTabBarProps {
  state: TabNavigationState<AppParamsList>;
  navigation: NavigationHelpers<AppParamsList>;
}

const Navigation: React.FC<INavigationProps> = ({ state, navigation }) => {
  const { data: profile, isFetching, refetch } = useGetProfileQuery();
  const [addToBasket, { isLoading }] = useAddToBasketMutation();

  const onClick = (props: Omit<INavigationBtnProps, 'onClick'>) => {
    if (props.isCurrent) return;
    navigation.navigate(props.type);
  };

  if (state.index === 0) return <></>;

  const loading = isFetching || isLoading;

  if (state.index === 5) {
    const productId: string = (state.routes[5].params as any)?.productId;
    const inCart = profile?.basket.some((item) => item.product.id === productId);
    const onClick = () => (inCart ? navigation.navigate('Cart') : addToBasket(productId).unwrap().then(refetch).catch(console.error));
    return (
      <View style={styles.navigation}>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10 }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Pressable onPress={onClick}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text h4 style={{ color: 'white' }}>
                  {inCart ? 'Уже в корзине' : 'В корзину'}
                </Text>
                {!inCart && <Icon name="add" color="white" />}
              </View>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.navigation}>
      {buttons.map((props, i) => (
        <NavigationBtn
          key={props.type}
          {...props}
          isCurrent={i === state.index - 1}
          onClick={() => onClick({ ...props, isCurrent: i === state.index - 1 })}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: 'gray',
    height: '8%',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
  },
});

export default Navigation;
