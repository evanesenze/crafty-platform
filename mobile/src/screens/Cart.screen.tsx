import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, Image } from '@rneui/base';
import React, { useState } from 'react';
import { Alert, ScrollView, View, StyleSheet, Linking } from 'react-native';
import CartItem from '../components/CartItem.component';
import Header from '../components/Header.component';
import { AppParamsList } from '../components/Layout.component';
import { useAppActions, useAppSelector } from '../hooks/useApp';
import { Order, useCreateOrderMutation, useGetOrderQuery, useGetProfileQuery } from '../store';
import QRCode from 'react-native-qrcode-svg';
import Loading from '../components/Loading.component';
import ConfirmOrder from '../components/ConfirmOrder.component';

const Cart: React.FC<NativeStackScreenProps<AppParamsList, 'Cart'>> = ({ navigation, route: { params } }) => {
  const { data: profile, isFetching, isSuccess } = useGetProfileQuery();
  const [openModal, setOpenModal] = useState(false);
  //   const { info } = useAppSelector((store) => store.user);
  //   const { activeGroup } = useAppSelector((store) => store.group);
  //   const { clearCart } = useAppActions();
  //   const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  //   const [confirmPayment, { isLoading: isPaymentLoading }] = useConfirmPaymentMutation();
  //   const [isPayment, setIsPayment] = useState(!!params?.orderId);
  //   const { data: menu } = useGetTodayMenuQuery(
  //     {
  //       groupId: String(activeGroup?.id),
  //     },
  //     { skip: !activeGroup }
  //   );
  //   const { data: existOrder } = useGetOrderQuery({ orderId: String(params?.orderId) }, { skip: !params?.orderId });
  //   const [currentOrder, setCurrentOrder] = useState<IOrder | undefined>(existOrder);

  //   const totalCost = isPayment ? currentOrder?.lunchSet.price : items.reduce((acc, { count, item }) => acc + count * item.price, 0);

  //   const confirm = () => {
  //     if (!currentOrder) return;
  //     confirmPayment({ orderId: currentOrder.id })
  //       .unwrap()
  //       .then(() => {
  //         Alert.alert('Успех', 'Заказ успешно оплачен');
  //         clearCart();
  //         setIsPayment(false);
  //         navigation.navigate('Orders');
  //       })
  //       .catch(console.error);
  //   };

  //   const create = async () => {
  //     if (!items.length || currentOrder || !info || !menu || !activeGroup) return;
  //     await createOrder({
  //       customerId: info.id,
  //       groupId: activeGroup.id,
  //       lunchSetId: items[0].item.id,
  //       menuId: menu.id,
  //       lunchSetUnits: items[0].count,
  //       options: [],
  //     })
  //       .unwrap()
  //       .then((res) => {
  //         setIsPayment(true);
  //         setCurrentOrder(res);
  //         clearCart();
  //       })
  //       .catch(() => Alert.alert('Ошибка при создании заказа'));
  //   };

  //   const onBack = () => {
  //     setIsPayment(false);
  //     setCurrentOrder(undefined);
  //   };

  const items = profile?.basket;
  const buyerId = profile?.id;
  const totalPrice = items?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const onClose = () => setOpenModal(false);

  const onSuccess = () => {
    onClose();
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.container}>
      <Header containerStyle={styles.headerContainer} />
      <ScrollView bounces={!!items?.length}>
        <Text h3 style={styles.pageTitle}>
          Корзина
        </Text>
        {isFetching ? (
          <Loading />
        ) : !items?.length ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartTitle}>Ваша корзина пуста!</Text>
          </View>
        ) : (
          items.map((item, i) => <CartItem key={i} index={i} item={item} />)
        )}
      </ScrollView>
      {!!items?.length && (
        <View style={styles.cartInfo}>
          <View style={styles.totalCost}>
            <Text h4>Общая стоимость</Text>
            <Text h4>{totalPrice} P</Text>
          </View>
          <Button onPress={() => setOpenModal(true)} color="gray">
            Перейти к оформлению
          </Button>
        </View>
      )}
      {!!items && !!buyerId && <ConfirmOrder visible={openModal} buyerId={buyerId} orderItems={items} onSuccess={onSuccess} onClose={onClose} />}
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
  pageTitle: { marginBottom: 10 },
  cartInfo: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingBottom: 20,
    marginLeft: '4%',
    backgroundColor: 'white',
  },
  totalCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerContainer: { marginBottom: 10 },
  emptyCart: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyCartTitle: { marginTop: '5%' },
  emptyCartImage: { width: 414, height: 414 },
});

export default Cart;
