import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Button, CheckBox, Icon, Switch, Text } from '@rneui/base';
import React from 'react';
import { Alert, View, Pressable, ScrollView, StyleSheet } from 'react-native';
import EditInfo from '../components/EditInfo.component';
import Header from '../components/Header.component';
import { AppParamsList } from '../components/Layout.component';
import Loading from '../components/Loading.component';
import { useAppActions, useAppSelector } from '../hooks/useApp';
import useModal from '../hooks/useModal';
import { useGetProfileQuery } from '../store';

const Profile: React.FC<NativeStackScreenProps<AppParamsList, 'Profile'>> = ({ navigation }) => {
  const { data: profile, isFetching, isSuccess } = useGetProfileQuery();
  const [openEditInfo, editInfo] = useModal(EditInfo, { key: 'editInfo', profile });

  const handleLogout = () => {
    Alert.alert('Подтвердите действие', 'Вы действительно хотите выйти?', [
      {
        text: 'Нет',
      },
      {
        text: 'Да',
        onPress: () => {
          // storageActiveGroupId.removeItem();
          // storageToken.removeItem();
          // logout();
          navigation.navigate('Auth');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header hideInfo lang containerStyle={styles.headerContainer} />
      {isFetching && <Loading />}
      {isSuccess && (
        <ScrollView>
          <View style={styles.infoWrapper}>
            <View>
              <Avatar
                size="large"
                containerStyle={styles.avatar}
                source={{ uri: profile.avatar }}
                icon={{ name: 'person', type: 'material' }}
                rounded
              />
            </View>
            <View style={styles.info}>
              <Text h4 style={styles.infoItem}>
                {profile.name}
              </Text>
              <Text style={styles.infoItem}>{profile.email}</Text>
            </View>
          </View>
          <Text
            onPress={openEditInfo}
            style={{ textDecorationLine: 'underline', fontSize: 16, textAlign: 'right', marginTop: 5, color: 'darkblue', marginBottom: 20 }}
          >
            Редактировать данные
          </Text>
          <View style={styles.alertsWrapper}>
            <Text h4>Оповещения</Text>
            <Switch color="gray" />
          </View>
          <View style={styles.helpWrapper}>
            <Text h4 style={styles.helpItem}>
              Помощь
            </Text>
            <View style={styles.helpItems}>
              <Text style={styles.helpItem}>История покупок</Text>
              <Text style={styles.helpItem}>Тех. поддержка</Text>
              <Text style={styles.helpItem}>О нас</Text>
              <Text>Политика конфиденциальности</Text>
            </View>
          </View>
          <Button style={styles.helpItems} color="gray" onPress={handleLogout}>
            Выйти
          </Button>
          {editInfo}
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
  infoWrapper: { flexDirection: 'row' },
  avatar: { backgroundColor: 'gray' },
  info: { paddingLeft: 10, flex: 1 },
  infoItem: { marginBottom: 5 },
  commandsWrapper: { marginBottom: 20 },
  alertsWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  helpWrapper: { marginBottom: 40 },
  helpItems: { marginBottom: 10 },
  helpItem: { marginBottom: 5 },
  headerContainer: { marginBottom: 10 },
});

export default Profile;
