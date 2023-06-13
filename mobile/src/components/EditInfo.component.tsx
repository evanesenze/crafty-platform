import { Button, Input, Text } from '@rneui/base';
import { Dialog } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useAppActions, useAppSelector } from '../hooks/useApp';
import { CommonComponentProps, CommonModalProps } from '../hooks/useModal';
import { UserProfile, useUpdateProfileMutation } from '../store';

interface IEditInfoProps extends CommonComponentProps {
  profile?: UserProfile;
}

const EditInfo: React.FC<CommonModalProps<IEditInfoProps, string>> = ({ props, ...dialogProps }) => {
  const { profile } = props;
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [name, setName] = useState(profile?.name ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');

  const submit = async () => {
    await updateProfile({ name, phone, email })
      .unwrap()
      .then(() => {
        Alert.alert('Вы обновили профиль');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Ошибка при обновлении профиля');
      });
    onCancel();
  };

  const onCancel = () => {
    dialogProps.onBackdropPress?.();
  };

  return (
    <Dialog {...dialogProps} onBackdropPress={onCancel}>
      <Dialog.Title title="Введите код команды" />
      <Text>Имя</Text>
      <Input value={name} onChangeText={setName} placeholder="Имя" />
      <Text>Почта</Text>
      <Input value={email} onChangeText={setEmail} placeholder="Почта" />
      <Text>Телефон</Text>
      <Input value={phone} onChangeText={setPhone} placeholder="Телефон" />
      <Button loading={isLoading} color="gray" onPress={submit}>
        Изменить
      </Button>
    </Dialog>
  );
};

export default EditInfo;
