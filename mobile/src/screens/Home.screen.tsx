import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchBar, Text } from '@rneui/themed';
import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header.component';
import { AppParamsList } from '../components/Layout.component';
import Loading from '../components/Loading.component';
import MenuItem from '../components/MenuItem.component';
import { useAppSelector } from '../hooks/useApp';
import { useAuth } from '../hooks/useAuth';
import { useAddToBasketMutation, useGetProductsQuery, useGetProfileQuery } from '../store';

// const Stack = createNativeStackNavigator<AppParamsList>();

const Home: React.FC<NativeStackScreenProps<AppParamsList, 'Home'>> = ({ navigation }) => {
  const [q, setSearchValue] = useState('');
  const { data: products, isLoading, isFetching, isSuccess, refetch } = useGetProductsQuery({ q });
  const { data: profile } = useGetProfileQuery();

  const basketProducts = useMemo(() => profile?.basket.map((item) => item.product), [profile?.basket]);

  const goToCart = () => navigation.navigate('Cart');

  const openProduct = (productId: string) => navigation.navigate('Product', { productId });

  return (
    <View style={styles.container}>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.menuContainer}>
          <SearchBar
            value={q}
            onChangeText={setSearchValue}
            lightTheme
            placeholder='Поиск'
            round
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInput}
          />
          {isFetching ? (
            <Loading />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={(props) => (
                <MenuItem
                  goToCart={goToCart}
                  openProduct={openProduct}
                  refetch={refetch}
                  inBasket={!!basketProducts?.some((item) => item.id === props.item.id)}
                  {...props}
                />
              )}
              numColumns={2}
            />
          )}
        </View>
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
  emptyMenu: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyMenuImage: { width: 414, height: 414 },
  menuContainer: { flex: 1 },
  searchBarContainer: {
    backgroundColor: 'transparent',
    padding: '1%',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: '2%',
  },
  searchBarInput: {
    backgroundColor: 'white',
    borderBottomColor: '#F5F5F5',
    borderTopColor: '#F5F5F5',
    borderRightColor: '#F5F5F5',
    borderLeftColor: '#F5F5F5',
    borderWidth: 1,
    borderBottomWidth: 1,
    height: 22,
  },
});

export default Home;
