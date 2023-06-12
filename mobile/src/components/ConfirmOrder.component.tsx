import React, { useState } from 'react';
import { StyleSheet, Modal, Text, ModalProps, View, TextInput, Alert } from 'react-native';
import { Input, Button } from '@rneui/base';
import { OrderItem, useCreateOrderMutation } from '../store';

interface ISupportProps extends ModalProps {
  onClose?(): void;
  onSuccess?(): void;
  orderItems: OrderItem[];
  buyerId: string;
}

const ConfirmOrder: React.FC<ISupportProps> = ({ onClose, onSuccess, orderItems, buyerId, ...props }) => {
  const [comment, setComment] = useState('');
  const [address, setAddress] = useState('');
  const [createOrder] = useCreateOrderMutation();

  const onFinish = async () => {
    if (!address) return Alert.alert('Заполните адрес доставки');
    const items = orderItems.map((item) => item.id);
    createOrder({ address, comment: comment || undefined, buyer: buyerId, seller: buyerId, items, discount: 0 })
      .unwrap()
      .then(onSuccess)
      .catch(console.error);
  };

  return (
    <Modal {...props} transparent animationType="fade">
      <View style={styles.modal}>
        <View onTouchStart={onClose} style={styles.layout} />
        <View style={styles.content}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>Информация о доставке</Text>
          <Text>Адрес доставки</Text>
          <Input value={address} onChangeText={setAddress} placeholder="Укажите адрес" />
          <Text>Комментарий</Text>
          <Input value={comment} onChangeText={setComment} placeholder="Оставьте комментарий" />
          <Button color="gray" onPress={onFinish}>
            Подтвердить заказ
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '90%',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-around',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  layout: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '100%',
    width: '100%',
  },
});

export default ConfirmOrder;
