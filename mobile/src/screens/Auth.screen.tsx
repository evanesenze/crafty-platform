import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, Input, Text } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { AppParamsList } from '../components/Layout.component';
import { useAuth } from '../hooks/useAuth';

const Auth: React.FC<NativeStackScreenProps<AppParamsList, 'Auth'>> = ({ navigation }) => {
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, isAuth } = useAuth();

  const handleSubmit = async () => {
    login({ email, password });
  };

  useEffect(() => {
    if (!isAuth) return;
    navigation.navigate('Home');
  }, [isAuth]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: '500', marginBottom: '5%' }}>
            Crafty
          </Text>
          <Text h3 style={styles.wrapperTitle}>
            Вход
          </Text>
          <Input label="Email" placeholder="Введите ваш Email" value={email} onChangeText={setEmail} />
          <Input
            label="Пароль"
            secureTextEntry={isSecure}
            placeholder="Введите пароль"
            value={password}
            onChangeText={setPassword}
            rightIcon={<Icon name={`visibility${isSecure ? '-off' : ''}`} onPress={() => setIsSecure((x) => !x)} />}
          />
          <Button containerStyle={styles.mainBtn} color="gray" onPress={handleSubmit} loading={loading}>
            Войти
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', height: '100%' },
  wrapper: { width: '90%' },
  wrapperTitle: { marginBottom: '5%', letterSpacing: 1 },
  mainBtn: { borderRadius: 10, marginBottom: '5%' },
  secondaryBtn: { textAlign: 'center' },
});

export default Auth;
