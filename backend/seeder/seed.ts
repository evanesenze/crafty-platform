import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { Schema, Types, connect, disconnect, model } from 'mongoose';
import slugify from 'slugify';
import { ICategory } from 'src/modules/categories/schemas/category.schema';
import { IProduct } from 'src/modules/products/schemas/product.schema';
config();
faker.setLocale('ru');

const getSlug = (text: string) => slugify(text).toLowerCase();

const productSchema = new Schema<IProduct>({
  category: { type: Types.ObjectId, ref: 'Category' },
  description: { type: String, required: true },
  images: { type: [{ type: String }], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  slug: { type: String, required: true },
});
const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

const Product = model<IProduct>('Product', productSchema);
const Category = model<ICategory>('Category', categorySchema);

const createProducts = async (quantity: number) => {
  await connect(process.env.BASE_URL);
  const products: any[] = [];

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();
    const categorySlug = getSlug(categoryName);

    const existCategory = await Category.findOne({ slug: categorySlug }).exec();
    const category =
      existCategory ??
      new Category({
        name: categoryName,
        slug: getSlug(categoryName),
      });
    if (!existCategory) await category.save();

    const product = new Product({
      name: productName,
      slug: getSlug(productName),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(500, 10000),
      images: Array.from({ length: faker.datatype.number({ min: 2, max: 6 }) })
        .fill(null)
        .map(() => faker.image.imageUrl(500, 500, categoryName, true)),
      category: category._id,
    });

    await product.save();

    products.push(product);
  }

  console.log(`Created ${products.length} products`);
};

const createProductsWithCategory = async (
  quantity: number,
  categoryId: string,
  ownerId: string,
) => {
  await connect(process.env.BASE_URL);
  const products: any[] = [];
  const existCategory = await Category.findById(categoryId).exec();
  if (!existCategory) throw new Error('Category not found');

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();

    const product = new Product({
      name: productName,
      slug: getSlug(productName),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(500, 10000),
      images: Array.from({ length: faker.datatype.number({ min: 2, max: 6 }) })
        .fill(null)
        .map(() => faker.image.imageUrl(500, 500, categoryName, true)),
      category: categoryId,
      owner: ownerId,
    });

    await product.save();

    products.push(product);
  }

  console.log(`Created ${products.length} products`);
};

const createProductsWithCategories = async (
  quantity: number,
  categoryIds: string[],
  ownerId: string,
) => {
  for (const categoryId of categoryIds) {
    await createProductsWithCategory(quantity, categoryId, ownerId);
  }
};

const main = async () => {
  console.log('Start seeding...');
  //   await createProducts(10);
  await createProductsWithCategories(
    10,
    [
      '648f71440bfd598e244bc19a',
      '648f71b30bfd598e244bc19e',
      '648f71c50bfd598e244bc1a2',
      '648f71d40bfd598e244bc1a6',
      '648f71de0bfd598e244bc1aa',
      '648f71f30bfd598e244bc1ae',
      '648f72000bfd598e244bc1b2',
      '648f72200bfd598e244bc1b6',
      '648f72410bfd598e244bc1bc',
      '648f70020bfd598e244bc184',
    ],
    '648f6f530bfd598e244bc171',
  );
};

main()
  .catch(console.error)
  .finally(() => {
    console.log('Seeding end');
    disconnect();
  });
