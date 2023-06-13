import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header.component';
import { AppParamsList } from '../components/Layout.component';
import { useAppSelector } from '../hooks/useApp';
import { Text } from '@rneui/base';
import OrderItem from '../components/OrderItem.components';
import Loading from '../components/Loading.component';
import { useGetOrdersQuery } from '../store';
import { useAuth } from '../hooks/useAuth';

const Orders: React.FC<NativeStackScreenProps<AppParamsList, 'Orders'>> = ({ navigation }) => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: orders, isFetching } = useGetOrdersQuery({ buyerId: String(user?.id) }, { skip: !user });

  return (
    <View style={styles.container}>
      <Header containerStyle={styles.headerContainer} />
      {isFetching && <Loading />}
      {!!orders && (
        <ScrollView>
          <Text h3 style={styles.historyTitle}>
            Ваши заказы
          </Text>
          {orders.map((props) => (
            <OrderItem key={props.id} {...props} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '2%',
    paddingRight: '2%',
    position: 'relative',
    backgroundColor: 'white',
  },
  headerContainer: { marginBottom: 10 },
  historyTitle: { marginBottom: 10 },
});

export default Orders;
