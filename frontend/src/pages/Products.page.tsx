import { Divider, Typography } from 'antd';
import { Loading } from 'components';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetCategoryQuery, useGetProductsQuery } from 'store';
import { categoryParamName, queryParamName } from 'utils';
import { ProductsBlock } from 'widgets';

const { Title, Text } = Typography;

export const Products: React.FC = () => {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get(categoryParamName) ?? undefined;
    const q = searchParams.get(queryParamName) ?? undefined;

    const { data: category, isFetching: isCategoryFetching } = useGetCategoryQuery(String(categoryId), { skip: !categoryId });
    const { data: products, isFetching: isProductsFetching } = useGetProductsQuery({ q, categoryId }, { skip: isCategoryFetching });

    const count = products?.length ?? 0;
    const isFetching = isCategoryFetching || isProductsFetching;

    return (
        <React.Fragment>
            {isFetching ? (
                <Loading />
            ) : (
                <>
                    <Title level={2} style={{ marginBottom: 10 }}>
                        Найдено {count} товара
                    </Title>
                    {!!category && <Text style={{ color: 'gray' }}>{category.name}</Text>}
                    <Divider />
                    {products && <ProductsBlock products={products} />}
                </>
            )}
        </React.Fragment>
    );
};
