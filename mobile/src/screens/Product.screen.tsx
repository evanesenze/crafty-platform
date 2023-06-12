import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../components/Header.component';
import { View, StyleSheet, Alert } from 'react-native';
import { AppParamsList } from '../components/Layout.component';
import { useAppSelector } from '../hooks/useApp';
import { useGetOrdersQuery, useGetProductQuery } from '../store';
import { Image, Text } from '@rneui/base';
import Loading from '../components/Loading.component';

const Product: React.FC<NativeStackScreenProps<AppParamsList, 'Product'>> = ({ navigation, route: { params } }) => {
  const { data: product, isFetching, isSuccess } = useGetProductQuery(String(params?.productId), { skip: !params?.productId });

  const onBack = () => navigation.goBack();

  if (!params?.productId) {
    Alert.alert('Товар не найден');
    onBack();
  }

  return (
    <View style={styles.container}>
      <Header onBack={onBack} />
      {isFetching && <Loading />}
      {isSuccess && (
        <View style={styles.infoWrapper}>
          <View style={styles.imageWrapper}>
            <Image style={{ height: 200, aspectRatio: 1 / 1, width: 200, borderRadius: 5 }} source={{ uri: product.images[0] }} />
          </View>
          <Text h3>{product.name}</Text>
        </View>
      )}
      {/* <Text>product</Text> */}
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
  infoWrapper: {
    display: 'flex',
    width: '100%',
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
});

export default Product;
