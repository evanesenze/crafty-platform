import { Icon } from '@rneui/base';
import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { OrderItem, useDeleteFromBasketMutation, useGetProfileQuery, useUpdateOrderItemMutation } from '../store';
import Loading from './Loading.component';

interface ICartItemProps {
  item: OrderItem;
  index: number;
}

export type QuantityFn = (id: string, count: number) => void;

const useControllers = (count?: number, itemId?: string) => {
  const [deleteFromBasket, basketState] = useDeleteFromBasketMutation();
  const [updateOrderItem, orderState] = useUpdateOrderItemMutation();
  const { refetch, isFetching } = useGetProfileQuery();

  const loading = isFetching || orderState.isLoading || basketState.isLoading;

  const handleCount: QuantityFn = (id, quantity) => {
    updateOrderItem({ id, quantity })
      .unwrap()
      .then(() => {
        refetch();
      })
      .catch(console.error);
  };

  const onDelete = () => itemId && deleteFromBasket(itemId).unwrap().catch(console.error);

  const onPlus = () => !!itemId && !!count && handleCount(itemId, count + 1);
  const onMinus = () => !!itemId && (!!count && count > 1 ? handleCount(itemId, count - 1) : onDelete());

  return { onDelete, onPlus, onMinus, loading };
};

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
  const { product, quantity, price, id } = item;
  const { name, images } = product;
  const uri = images[0];
  const { loading, onDelete, onMinus, onPlus } = useControllers(quantity, id);

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri }} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.controlsContainer}>
          {loading ? (
            <Loading />
          ) : (
            <View style={styles.controlsWrapper}>
              <Pressable onPress={onMinus}>
                <Text style={styles.cartControl}>-</Text>
              </Pressable>
              <Text style={styles.controlsCount}>{quantity}</Text>
              <Pressable onPress={onPlus}>
                <Text style={styles.cartControl}>+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <View style={styles.priceWrapper}>
        <View style={styles.closeBtn}>
          <Icon name="close" onPress={onDelete} />
        </View>
        <Text>{price * quantity}&nbsp;P</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,
    padding: 10,
    borderColor: '#F5F5F5',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  imageWrapper: { justifyContent: 'center', alignItems: 'center' },
  image: { backgroundColor: 'gray', borderRadius: 5, height: '100%', aspectRatio: 1 / 1, marginLeft: 20, marginRight: 20 },
  infoWrapper: { flex: 3, justifyContent: 'space-between' },
  itemTitle: { fontSize: 18 },
  controlsContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  controlsWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 5,
    borderRadius: 8,
  },
  controlsCount: {
    fontSize: 18,
    lineHeight: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
  priceWrapper: { flex: 1, justifyContent: 'space-between' },
  closeBtn: { alignItems: 'flex-end' },
  cartControl: {
    fontSize: 18,
    lineHeight: 18,
  },
});

export default CartItem;
