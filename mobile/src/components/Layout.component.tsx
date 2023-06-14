import React from 'react';
import Navigation, { INavigationProps } from './Navigation.component';
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home.screen';
import Orders from '../screens/Orders.screen';
import Cart from '../screens/Cart.screen';
import Profile from '../screens/Profile.screen';
import Auth from '../screens/Auth.screen';
import Product from '../screens/Product.screen';

export type AppParamsList = {
  Home: undefined;
  Orders: undefined;
  Cart?: { orderId?: string };
  Profile: undefined;
  Auth: undefined;
  Product?: { productId: string };
};

export type ViewType = keyof AppParamsList;

const Tab = createBottomTabNavigator<AppParamsList>();

const screenOptions: BottomTabNavigationOptions = { headerShown: false, unmountOnBlur: true };

const tabBar = (props: BottomTabBarProps) => <Navigation {...(props as INavigationProps)} />;

const Layout: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBar={tabBar}>
      <Tab.Screen name="Auth" component={Auth} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Product" component={Product} />
    </Tab.Navigator>
  );
};

export default Layout;
