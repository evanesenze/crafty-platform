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
    const category = existCategory ?? new Category({
      name: categoryName,
      slug: getSlug(categoryName)
    });
    if (!existCategory)
      await category.save();

    const product = new Product({
      name: productName,
      slug: getSlug(productName),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(500, 100000),
      images: Array.from({ length: faker.datatype.number({ min: 2, max: 6 }) }).fill(null).map(() => faker.image.imageUrl(500, 500)),
      category: category._id
    });

    await product.save();

    products.push(product);
  }

  console.log(`Created ${products.length} products`);
};

const main = async () => {
  console.log('Start seeding...');
  await createProducts(10);
}

main()
  .catch(console.error)
  .finally(() => {
    console.log('Seeding end');
    disconnect();
  }); 