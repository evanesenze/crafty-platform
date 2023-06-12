import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Layout from './src/components/Layout.component';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Layout />
        </View>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
