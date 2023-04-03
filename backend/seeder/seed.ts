import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { Schema, Types, connect, disconnect, model } from 'mongoose';
import { ICategory } from 'src/modules/categories/schemas/category.schema';
import { IProduct } from 'src/modules/products/schemas/product.schema';
config();


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

    const category = new Category({
      name: categoryName,
      slug: faker.helpers.slugify(categoryName)
    });

    await category.save();

    const product = new Product({
      name: productName,
      slug: faker.helpers.slugify(productName),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(500, 100000),
      images: Array.from({ length: faker.datatype.number({ min: 2, max: 6 }) }).fill(null).map(() => faker.image.imageUrl()),
      category: category
    });

    await product.save();

    products.push(product);
  }

  console.log(`Created ${products.length} products`);
};

const main = async () => {
  console.log('Start seeding...');
  await createProducts(1);
}

main()
  .catch(console.error)
  .finally(() => {
    console.log('Seeding end');
    disconnect();
  }); 