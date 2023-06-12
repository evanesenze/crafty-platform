import React from 'react';
import { StyleSheet, Modal, Text, ModalProps, View, TextInput } from 'react-native';
import { Input, Button } from '@rneui/base';

interface ISupportProps extends ModalProps {
  onClose?(): void;
}

const Support: React.FC<ISupportProps> = ({ onClose, ...props }) => {
  const reasonRef = React.createRef<Input & TextInput>();

  return (
    <Modal {...props}>
      <View style={styles.modal}>
        <View onTouchStart={onClose} style={styles.layout} />
        <View style={styles.content}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>Написать в поддержку</Text>
          <Text>Причина</Text>
          <Input ref={reasonRef} placeholder="Укажите причину обращения" />
          <Text>Сообщение</Text>
          <Input placeholder="Опишите ситуацию" />
          <Button color="gray" onPress={onClose}>
            Отправить
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

export default Support;
