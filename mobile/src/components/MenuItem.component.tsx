import React from 'react';
import { View, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import CartIcon from '../icons/Cart.icon';
import { Product, useAddToBasketMutation, useGetProductsQuery } from '../store';
import Loading from './Loading.component';
import { Icon, Text } from '@rneui/base';

interface IMenuItemProps {
  item: Product;
  inBasket: boolean;
  refetch: () => void;
  goToCart: () => void;
  openProduct: (id: string) => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({ item, inBasket, refetch, goToCart, openProduct }) => {
  const [addToBasketFetch, { isLoading }] = useAddToBasketMutation();
  const { name, description, price, images } = item;
  const uri = images[0];

  const toggleBasket = () => {
    addToBasketFetch(item.id)
      .unwrap()
      .then(() => {
        refetch();
      })
      .catch(console.error);
  };

  return (
    <View style={styles.menuItem}>
      <Pressable onPress={() => openProduct(item.id)}>
        <Image style={styles.image} source={{ uri }} />
        <Text style={styles.itemTitle}>{name}</Text>
        {/* <Text style={styles.itemInfo}>{description}</Text> */}
      </Pressable>
      <View style={styles.controls}>
        <Pressable onPress={inBasket ? goToCart : toggleBasket}>
          <View style={styles.cartButton}>
            {inBasket ? (
              <Text style={{ color: 'gray' }}>В корзине</Text>
            ) : (
              <>
                <Text style={styles.price}>{price} Р</Text>
                {isLoading ? <ActivityIndicator /> : <Icon name="add" color="gray" size={22} />}
              </>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    position: 'relative',
    flex: 1,
    borderRadius: 10,
    paddingBottom: 0,
    margin: '1%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  image: { width: '100%', aspectRatio: 1 / 1, backgroundColor: 'gray', borderRadius: 5 },
  cartButton: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2.5,
    paddingTop: 2.5,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    color: 'gray',
    marginRight: 2,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 14,
    height: 14,
    margin: '1%',
    marginTop: '3%',
  },
  itemInfo: {
    fontSize: 10,
    lineHeight: 10,
    color: 'grey',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    marginTop: 5,
  },
  controlsWrapper: { flex: 1, flexDirection: 'row' },
  currentCount: {
    color: 'white',
    fontSize: 18,
    lineHeight: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default MenuItem;
