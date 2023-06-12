import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Order } from '../store';
import { Text } from '@rneui/base';

const numberPattern = /\d+/g;

const OrderItem: React.FC<Order> = ({ id, status, items, address }) => {
  const price = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log(items);
  const orderNumber = id.match(numberPattern)?.join('');
  return (
    <View style={styles.container}>
      <View style={styles.infoWrapper}>
        <Text style={styles.itemTitle}>Заказ № {orderNumber}</Text>
        <Text style={styles.description}>Статус заказа: {status}</Text>
        <Text style={styles.description}>Адрес доставки: {address}</Text>
        <Text style={{...styles.description, marginBottom: '5%'}}>Общая стоимость: {price} P</Text>
      </View>
      <View style={styles.itemsWrapper}>
        {items.map((item) => {
          const { product, quantity, price } = item;
          const { images, name } = product;
          const uri = images[0];
          return (
            <View style={styles.item}>
              <Image style={styles.image} source={{ uri }} />
              <View style={styles.itemInfo}>
                <Text h4 numberOfLines={2}>
                  {name}
                </Text>
                <Text>
                  {price} P x {quantity}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemsWrapper: { flex: 1, width: '100%', display: 'flex', flexDirection: 'column' },
  item: { flex: 1, height: 100, width: '100%', marginBottom: 15, display: 'flex', flexDirection: 'row' },
  itemInfo: { marginLeft: 10, flex: 1, display: 'flex', justifyContent: 'space-between' },
  image: { height: '100%', aspectRatio: 1 / 1, borderRadius: 5 },
  infoWrapper: {
    flex: 3,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  itemTitle: { fontSize: 18 },
  description: {
    fontSize: 10,
    lineHeight: 10,
    color: 'grey',
    paddingTop: '3%',
  },
  controlsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderDate: {
    fontSize: 10,
    lineHeight: 10,
    color: 'grey',
  },
  payment: { fontSize: 16, lineHeight: 16 },
});

export default OrderItem;
