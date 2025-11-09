import 'dotenv/config';
import { db } from '../db';
import { products, productVariants, emiPlans, variantImages } from '../db/schema';
import { eq } from 'drizzle-orm';

const productsData = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'iPhone 17 Pro',
    brand: 'Apple',
    category: 'Smartphone',
    description: 'The latest iPhone with advanced camera system and A19 Pro chip',
    basePrice: '119900.00',
    imageUrl: '/iphone-17-pro-silver-front-view.jpg',
    slug: 'iphone-17-pro',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'Smartphone',
    description: 'Premium Android flagship with S Pen and advanced features',
    basePrice: '129999.00',
    imageUrl: '/samsung-galaxy-s25-ultra-smartphone-black.jpg',
    slug: 'samsung-galaxy-s25-ultra',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'MacBook Pro M4',
    brand: 'Apple',
    category: 'Laptop',
    description: 'Powerful laptop with M4 chip for professionals',
    basePrice: '199900.00',
    imageUrl: '/macbook-pro-m4-laptop-silver.jpg',
    slug: 'macbook-pro-m4',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'iPad Pro 13-inch',
    brand: 'Apple',
    category: 'Tablet',
    description: 'Ultimate iPad experience with M4 chip',
    basePrice: '109900.00',
    imageUrl: '/ipad-pro-13-inch-tablet-space-gray.jpg',
    slug: 'ipad-pro-13-inch',
  },
];

const variantsData = [
  { productId: '11111111-1111-1111-1111-111111111111', storage: '128GB', color: 'Natural Titanium', mrp: '119900.00', price: '114900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '256GB', color: 'Natural Titanium', mrp: '129900.00', price: '124900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '512GB', color: 'Natural Titanium', mrp: '149900.00', price: '144900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '1TB', color: 'Natural Titanium', mrp: '169900.00', price: '164900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '512GB', color: 'Natural Titanium', mrp: '159900.00', price: '154900.00', ram: '12GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '1TB', color: 'Natural Titanium', mrp: '179900.00', price: '174900.00', ram: '12GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '128GB', color: 'Blue Titanium', mrp: '119900.00', price: '114900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '256GB', color: 'Blue Titanium', mrp: '129900.00', price: '124900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '128GB', color: 'White Titanium', mrp: '119900.00', price: '114900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '256GB', color: 'White Titanium', mrp: '129900.00', price: '124900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '128GB', color: 'Black Titanium', mrp: '119900.00', price: '114900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  { productId: '11111111-1111-1111-1111-111111111111', storage: '256GB', color: 'Black Titanium', mrp: '129900.00', price: '124900.00', ram: '8GB', connectivity: '5G', imageUrl: '/iphone-17-pro-silver-front-view.jpg' },
  
  { productId: '22222222-2222-2222-2222-222222222222', storage: '256GB', color: 'Titanium Black', mrp: '129999.00', price: '124999.00', ram: '12GB', connectivity: '5G', imageUrl: '/samsung-galaxy-s25-ultra-smartphone-black.jpg' },
  { productId: '22222222-2222-2222-2222-222222222222', storage: '512GB', color: 'Titanium Black', mrp: '139999.00', price: '134999.00', ram: '12GB', connectivity: '5G', imageUrl: '/samsung-galaxy-s25-ultra-smartphone-black.jpg' },
  { productId: '22222222-2222-2222-2222-222222222222', storage: '256GB', color: 'Titanium Gray', mrp: '129999.00', price: '124999.00', ram: '12GB', connectivity: '5G', imageUrl: '/samsung-galaxy-s25-ultra-smartphone-black.jpg' },
  { productId: '22222222-2222-2222-2222-222222222222', storage: '512GB', color: 'Titanium Gray', mrp: '139999.00', price: '134999.00', ram: '12GB', connectivity: '5G', imageUrl: '/samsung-galaxy-s25-ultra-smartphone-black.jpg' },
  
  { productId: '33333333-3333-3333-3333-333333333333', storage: '512GB', color: 'Space Gray', mrp: '199900.00', price: '194900.00', ram: null, connectivity: null, imageUrl: '/macbook-pro-m4-laptop-silver.jpg' },
  { productId: '33333333-3333-3333-3333-333333333333', storage: '1TB', color: 'Space Gray', mrp: '229900.00', price: '224900.00', ram: null, connectivity: null, imageUrl: '/macbook-pro-m4-laptop-silver.jpg' },
  { productId: '33333333-3333-3333-3333-333333333333', storage: '512GB', color: 'Silver', mrp: '199900.00', price: '194900.00', ram: null, connectivity: null, imageUrl: '/macbook-pro-m4-laptop-silver.jpg' },
  { productId: '33333333-3333-3333-3333-333333333333', storage: '1TB', color: 'Silver', mrp: '229900.00', price: '224900.00', ram: null, connectivity: null, imageUrl: '/macbook-pro-m4-laptop-silver.jpg' },
  
  { productId: '44444444-4444-4444-4444-444444444444', storage: '256GB', color: 'Space Gray', mrp: '109900.00', price: '104900.00', ram: null, connectivity: null, imageUrl: '/ipad-pro-13-inch-tablet-space-gray.jpg' },
  { productId: '44444444-4444-4444-4444-444444444444', storage: '512GB', color: 'Space Gray', mrp: '129900.00', price: '124900.00', ram: null, connectivity: null, imageUrl: '/ipad-pro-13-inch-tablet-space-gray.jpg' },
  { productId: '44444444-4444-4444-4444-444444444444', storage: '256GB', color: 'Silver', mrp: '109900.00', price: '104900.00', ram: null, connectivity: null, imageUrl: '/ipad-pro-13-inch-tablet-space-gray.jpg' },
  { productId: '44444444-4444-4444-4444-444444444444', storage: '512GB', color: 'Silver', mrp: '129900.00', price: '124900.00', ram: null, connectivity: null, imageUrl: '/ipad-pro-13-inch-tablet-space-gray.jpg' },
];

const emiPlansData = [
  { productId: '11111111-1111-1111-1111-111111111111', variantId: null, tenureMonths: 3, monthlyPayment: '38300.00', interestRate: '0.00', totalAmount: '114900.00', cashback: '2298.00' },
  { productId: '11111111-1111-1111-1111-111111111111', variantId: null, tenureMonths: 6, monthlyPayment: '19150.00', interestRate: '0.00', totalAmount: '114900.00', cashback: '3447.00' },
  { productId: '11111111-1111-1111-1111-111111111111', variantId: null, tenureMonths: 9, monthlyPayment: '12767.00', interestRate: '0.00', totalAmount: '114903.00', cashback: '4596.00' },
  { productId: '11111111-1111-1111-1111-111111111111', variantId: null, tenureMonths: 12, monthlyPayment: '9575.00', interestRate: '0.00', totalAmount: '114900.00', cashback: '5745.00' },
  { productId: '11111111-1111-1111-1111-111111111111', variantId: null, tenureMonths: 18, monthlyPayment: '6383.00', interestRate: '0.00', totalAmount: '114894.00', cashback: '8043.00' },
  { productId: '11111111-1111-1111-1111-111111111111', variantId: null, tenureMonths: 24, monthlyPayment: '4788.00', interestRate: '0.00', totalAmount: '114912.00', cashback: '10341.00' },
  
  { productId: '22222222-2222-2222-2222-222222222222', variantId: null, tenureMonths: 3, monthlyPayment: '41666.00', interestRate: '0.00', totalAmount: '124998.00', cashback: '2500.00' },
  { productId: '22222222-2222-2222-2222-222222222222', variantId: null, tenureMonths: 6, monthlyPayment: '20833.00', interestRate: '0.00', totalAmount: '124998.00', cashback: '3750.00' },
  { productId: '22222222-2222-2222-2222-222222222222', variantId: null, tenureMonths: 9, monthlyPayment: '13889.00', interestRate: '0.00', totalAmount: '125001.00', cashback: '5000.00' },
  { productId: '22222222-2222-2222-2222-222222222222', variantId: null, tenureMonths: 12, monthlyPayment: '10417.00', interestRate: '0.00', totalAmount: '125004.00', cashback: '6250.00' },
  { productId: '22222222-2222-2222-2222-222222222222', variantId: null, tenureMonths: 18, monthlyPayment: '6944.00', interestRate: '0.00', totalAmount: '124992.00', cashback: '8750.00' },
  { productId: '22222222-2222-2222-2222-222222222222', variantId: null, tenureMonths: 24, monthlyPayment: '5208.00', interestRate: '0.00', totalAmount: '124992.00', cashback: '11250.00' },
  
  { productId: '33333333-3333-3333-3333-333333333333', variantId: null, tenureMonths: 3, monthlyPayment: '64967.00', interestRate: '0.00', totalAmount: '194901.00', cashback: '3898.00' },
  { productId: '33333333-3333-3333-3333-333333333333', variantId: null, tenureMonths: 6, monthlyPayment: '32483.00', interestRate: '0.00', totalAmount: '194898.00', cashback: '5847.00' },
  { productId: '33333333-3333-3333-3333-333333333333', variantId: null, tenureMonths: 9, monthlyPayment: '21656.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '7796.00' },
  { productId: '33333333-3333-3333-3333-333333333333', variantId: null, tenureMonths: 12, monthlyPayment: '16242.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '9745.00' },
  { productId: '33333333-3333-3333-3333-333333333333', variantId: null, tenureMonths: 18, monthlyPayment: '10828.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '13643.00' },
  { productId: '33333333-3333-3333-3333-333333333333', variantId: null, tenureMonths: 24, monthlyPayment: '8121.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '17541.00' },
  
  { productId: '44444444-4444-4444-4444-444444444444', variantId: null, tenureMonths: 3, monthlyPayment: '34967.00', interestRate: '0.00', totalAmount: '104901.00', cashback: '2098.00' },
  { productId: '44444444-4444-4444-4444-444444444444', variantId: null, tenureMonths: 6, monthlyPayment: '17483.00', interestRate: '0.00', totalAmount: '104898.00', cashback: '3147.00' },
  { productId: '44444444-4444-4444-4444-444444444444', variantId: null, tenureMonths: 9, monthlyPayment: '11656.00', interestRate: '0.00', totalAmount: '104904.00', cashback: '4196.00' },
  { productId: '44444444-4444-4444-4444-444444444444', variantId: null, tenureMonths: 12, monthlyPayment: '8742.00', interestRate: '0.00', totalAmount: '104904.00', cashback: '5245.00' },
  { productId: '44444444-4444-4444-4444-444444444444', variantId: null, tenureMonths: 18, monthlyPayment: '5828.00', interestRate: '0.00', totalAmount: '104904.00', cashback: '7343.00' },
  { productId: '44444444-4444-4444-4444-444444444444', variantId: null, tenureMonths: 24, monthlyPayment: '4371.00', interestRate: '0.00', totalAmount: '104904.00', cashback: '9441.00' },
];

async function seed() {
  console.log('🌱 Starting seed...');

  try {
    console.log('🗑️  Clearing existing data...');
    await db.delete(emiPlans);
    await db.delete(variantImages);
    await db.delete(productVariants);
    await db.delete(products);
    console.log('✅ Existing data cleared');

    console.log('📦 Inserting products...');
    await db.insert(products).values(productsData);
    console.log(`✅ Inserted ${productsData.length} products`);

    console.log('🎨 Inserting product variants...');
    const insertedVariants = await db.insert(productVariants).values(variantsData).returning();
    console.log(`✅ Inserted ${insertedVariants.length} variants`);

    console.log('🖼️  Inserting variant images...');
    const variantImagesData: Array<{ variantId: string; imageUrl: string; displayOrder: number }> = [];
    
    for (const variant of insertedVariants) {
      const color = variant.color.toLowerCase();
      const baseImage = variant.imageUrl;
      
      if (color.includes('natural titanium') || color.includes('silver')) {
        variantImagesData.push(
          { variantId: variant.id, imageUrl: baseImage, displayOrder: 0 },
          { variantId: variant.id, imageUrl: baseImage.replace('-front-view', '-back-view'), displayOrder: 1 },
          { variantId: variant.id, imageUrl: baseImage.replace('-front-view', '-side-view'), displayOrder: 2 },
          { variantId: variant.id, imageUrl: baseImage.replace('-front-view', '-detail-view'), displayOrder: 3 }
        );
      } else if (color.includes('blue titanium')) {
        variantImagesData.push(
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'blue'), displayOrder: 0 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'blue').replace('-front-view', '-back-view'), displayOrder: 1 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'blue').replace('-front-view', '-side-view'), displayOrder: 2 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'blue').replace('-front-view', '-detail-view'), displayOrder: 3 }
        );
      } else if (color.includes('white titanium')) {
        variantImagesData.push(
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'white'), displayOrder: 0 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'white').replace('-front-view', '-back-view'), displayOrder: 1 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'white').replace('-front-view', '-side-view'), displayOrder: 2 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'white').replace('-front-view', '-detail-view'), displayOrder: 3 }
        );
      } else if (color.includes('black titanium') || color.includes('titanium black')) {
        variantImagesData.push(
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'black'), displayOrder: 0 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'black').replace('-front-view', '-back-view'), displayOrder: 1 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'black').replace('-front-view', '-side-view'), displayOrder: 2 },
          { variantId: variant.id, imageUrl: baseImage.replace('silver', 'black').replace('-front-view', '-detail-view'), displayOrder: 3 }
        );
      } else if (color.includes('titanium gray') || color.includes('space gray')) {
        variantImagesData.push(
          { variantId: variant.id, imageUrl: baseImage, displayOrder: 0 },
          { variantId: variant.id, imageUrl: baseImage.replace('-front-view', '-back-view'), displayOrder: 1 },
          { variantId: variant.id, imageUrl: baseImage.replace('-front-view', '-side-view'), displayOrder: 2 },
          { variantId: variant.id, imageUrl: baseImage.replace('-front-view', '-detail-view'), displayOrder: 3 }
        );
      } else {
        variantImagesData.push(
          { variantId: variant.id, imageUrl: baseImage, displayOrder: 0 }
        );
      }
    }
    
    if (variantImagesData.length > 0) {
      await db.insert(variantImages).values(variantImagesData);
      console.log(`✅ Inserted ${variantImagesData.length} variant images`);
    }

    console.log('💳 Inserting EMI plans...');
    await db.insert(emiPlans).values(emiPlansData);
    console.log(`✅ Inserted ${emiPlansData.length} EMI plans`);

    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log('✨ Seed script finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed script failed:', error);
    process.exit(1);
  });


