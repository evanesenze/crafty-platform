import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../components/Header.component';
import { View, StyleSheet, Alert, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { AppParamsList } from '../components/Layout.component';
import { categoryApi, useCreateReviewMutation, useGetOrdersQuery, useGetProductQuery, useGetReviewsQuery } from '../store';
import { AirbnbRating, Avatar, Button, Card, Divider, Image, Text } from '@rneui/base';
import Loading from '../components/Loading.component';
import { useState } from 'react';

const Product: React.FC<NativeStackScreenProps<AppParamsList, 'Product'>> = ({ navigation, route: { params } }) => {
  const productId = params?.productId;
  const { data: product, isFetching, isSuccess } = useGetProductQuery(String(productId), { skip: !productId });
  const { data: reviews } = useGetReviewsQuery({ productId }, { skip: !productId });
  const [createReview, reviewState] = useCreateReviewMutation();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const reviewsCount = Number(reviews?.length);
  const totalRating = Number(Number(reviews?.reduce((acc, item) => acc + item.rating, 0)) / reviewsCount);

  const onBack = () => navigation.goBack();

  const onSendReview = () => {
    productId &&
      createReview({ product: productId, rating: reviewRating, text: reviewText })
        .unwrap()
        .then(() => {
          setReviewText('');
          setReviewRating(5);
        })
        .catch(console.error);
  };

  if (!params?.productId) {
    Alert.alert('Товар не найден');
    onBack();
  }

  return (
    <View style={styles.container}>
      <Header onBack={onBack} />
      {isFetching && <Loading />}
      {isSuccess && (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.infoWrapper}>
            <View style={styles.imageWrapper}>
              <Image style={{ height: 200, aspectRatio: 1 / 1, width: 200, borderRadius: 5 }} source={{ uri: product.images[0] }} />
              <AirbnbRating defaultRating={totalRating} isDisabled showRating={false} size={14} />
              <Text style={{ color: 'gray', textTransform: 'lowercase' }}>{product.category?.name}</Text>
            </View>
            <Text h3 style={{ marginBottom: 5 }}>
              {product.name}
            </Text>
            <Text h4 style={{ marginBottom: 15 }}>
              {product.price} P
            </Text>
            <Text style={{ marginBottom: 25 }}>{product.description}</Text>
            <Text h4>Отзывы ({reviews?.length})</Text>
            <View style={{ marginBottom: 10 }}>
              {!reviewsCount && <Text style={{ textAlign: 'center', color: 'gray' }}>На товар нет отзывов</Text>}
              {reviews?.map((item) => (
                <Card key={item.id}>
                  <Card.Title>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar size="medium" source={{ uri: item.user?.avatar }} icon={{ name: 'person', type: 'material' }} rounded />
                      <View>
                        <Text style={{ marginLeft: 10 }}>{item.user?.name}</Text>
                        <AirbnbRating defaultRating={item.rating} isDisabled showRating={false} size={16} />
                      </View>
                    </View>
                  </Card.Title>
                  <Text>{item.text}</Text>
                </Card>
              ))}
            </View>
            <Divider />
            <Card>
              <Card.Title>Ваш отзыв</Card.Title>
              <AirbnbRating defaultRating={reviewRating} onFinishRating={setReviewRating} showRating={false} size={20} />
              <TextInput
                style={{ marginBottom: 10 }}
                value={reviewText}
                onChangeText={setReviewText}
                placeholder="Комментарий"
                multiline
                numberOfLines={3}
              />
              <Button onPress={onSendReview} loading={reviewState.isLoading} disabled={!reviewText} color="gray">
                Отправить
              </Button>
            </Card>
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingBottom: '2%',
    position: 'relative',
    backgroundColor: 'white',
  },
  infoWrapper: {
    display: 'flex',
    width: '100%',
  },
  imageWrapper: {
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Product;
