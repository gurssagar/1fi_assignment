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
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'OnePlus 12 Pro',
    brand: 'OnePlus',
    category: 'Smartphone',
    description: 'Flagship Android phone with Snapdragon 8 Gen 3 and fast charging',
    basePrice: '69999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'oneplus-12-pro',
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    category: 'Smartphone',
    description: 'Premium Android phone with advanced AI features and camera',
    basePrice: '89999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'google-pixel-9-pro',
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    category: 'Smartphone',
    description: 'High-end smartphone with Leica camera system',
    basePrice: '79999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'xiaomi-14-ultra',
  },
  {
    id: '88888888-8888-8888-8888-888888888888',
    name: 'Dell XPS 15',
    brand: 'Dell',
    category: 'Laptop',
    description: 'Premium 15-inch laptop with Intel Core i9 and OLED display',
    basePrice: '179900.00',
    imageUrl: '/placeholder.jpg',
    slug: 'dell-xps-15',
  },
  {
    id: '99999999-9999-9999-9999-999999999999',
    name: 'HP Spectre x360',
    brand: 'HP',
    category: 'Laptop',
    description: 'Convertible 2-in-1 laptop with premium design and performance',
    basePrice: '149900.00',
    imageUrl: '/placeholder.jpg',
    slug: 'hp-spectre-x360',
  },
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Lenovo ThinkPad X1 Carbon',
    brand: 'Lenovo',
    category: 'Laptop',
    description: 'Business laptop with exceptional build quality and security',
    basePrice: '159900.00',
    imageUrl: '/placeholder.jpg',
    slug: 'lenovo-thinkpad-x1-carbon',
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    name: 'Samsung Galaxy Tab S9 Ultra',
    brand: 'Samsung',
    category: 'Tablet',
    description: 'Large 14.6-inch tablet with S Pen and powerful performance',
    basePrice: '119999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'samsung-galaxy-tab-s9-ultra',
  },
  {
    id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
    name: 'iPad Air',
    brand: 'Apple',
    category: 'Tablet',
    description: 'Powerful and versatile tablet with M2 chip',
    basePrice: '59900.00',
    imageUrl: '/placeholder.jpg',
    slug: 'ipad-air',
  },
  {
    id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
    name: 'MacBook Air M4',
    brand: 'Apple',
    category: 'Laptop',
    description: 'Ultra-thin and lightweight laptop with M4 chip',
    basePrice: '114900.00',
    imageUrl: '/placeholder.jpg',
    slug: 'macbook-air-m4',
  },
  {
    id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    name: 'Surface Laptop 6',
    brand: 'Microsoft',
    category: 'Laptop',
    description: 'Premium Windows laptop with excellent build quality',
    basePrice: '129900.00',
    imageUrl: '/placeholder.jpg',
    slug: 'surface-laptop-6',
  },
  {
    id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    name: 'ASUS ROG Strix G16',
    brand: 'ASUS',
    category: 'Laptop',
    description: 'Gaming laptop with RTX 4070 and high refresh rate display',
    basePrice: '149999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'asus-rog-strix-g16',
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
  
  { productId: '55555555-5555-5555-5555-555555555555', storage: '256GB', color: 'Silky Black', mrp: '69999.00', price: '66999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '55555555-5555-5555-5555-555555555555', storage: '512GB', color: 'Silky Black', mrp: '79999.00', price: '76999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '55555555-5555-5555-5555-555555555555', storage: '256GB', color: 'Flowy Emerald', mrp: '69999.00', price: '66999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '55555555-5555-5555-5555-555555555555', storage: '512GB', color: 'Flowy Emerald', mrp: '79999.00', price: '76999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  
  { productId: '66666666-6666-6666-6666-666666666666', storage: '256GB', color: 'Obsidian', mrp: '89999.00', price: '84999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '66666666-6666-6666-6666-666666666666', storage: '512GB', color: 'Obsidian', mrp: '99999.00', price: '94999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '66666666-6666-6666-6666-666666666666', storage: '256GB', color: 'Porcelain', mrp: '89999.00', price: '84999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '66666666-6666-6666-6666-666666666666', storage: '512GB', color: 'Porcelain', mrp: '99999.00', price: '94999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  
  { productId: '77777777-7777-7777-7777-777777777777', storage: '256GB', color: 'Black', mrp: '79999.00', price: '74999.00', ram: '16GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '77777777-7777-7777-7777-777777777777', storage: '512GB', color: 'Black', mrp: '89999.00', price: '84999.00', ram: '16GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '77777777-7777-7777-7777-777777777777', storage: '256GB', color: 'White', mrp: '79999.00', price: '74999.00', ram: '16GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '77777777-7777-7777-7777-777777777777', storage: '512GB', color: 'White', mrp: '89999.00', price: '84999.00', ram: '16GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  
  { productId: '88888888-8888-8888-8888-888888888888', storage: '512GB', color: 'Platinum Silver', mrp: '179900.00', price: '174900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '88888888-8888-8888-8888-888888888888', storage: '1TB', color: 'Platinum Silver', mrp: '209900.00', price: '204900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '88888888-8888-8888-8888-888888888888', storage: '512GB', color: 'Graphite', mrp: '179900.00', price: '174900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '88888888-8888-8888-8888-888888888888', storage: '1TB', color: 'Graphite', mrp: '209900.00', price: '204900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: '99999999-9999-9999-9999-999999999999', storage: '512GB', color: 'Nightfall Black', mrp: '149900.00', price: '144900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '99999999-9999-9999-9999-999999999999', storage: '1TB', color: 'Nightfall Black', mrp: '179900.00', price: '174900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '99999999-9999-9999-9999-999999999999', storage: '512GB', color: 'Natural Silver', mrp: '149900.00', price: '144900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '99999999-9999-9999-9999-999999999999', storage: '1TB', color: 'Natural Silver', mrp: '179900.00', price: '174900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', storage: '512GB', color: 'Black', mrp: '159900.00', price: '154900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', storage: '1TB', color: 'Black', mrp: '189900.00', price: '184900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', storage: '256GB', color: 'Graphite', mrp: '119999.00', price: '114999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', storage: '512GB', color: 'Graphite', mrp: '139999.00', price: '134999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', storage: '256GB', color: 'Beige', mrp: '119999.00', price: '114999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', storage: '512GB', color: 'Beige', mrp: '139999.00', price: '134999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', storage: '128GB', color: 'Space Gray', mrp: '59900.00', price: '56900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', storage: '256GB', color: 'Space Gray', mrp: '69900.00', price: '66900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', storage: '128GB', color: 'Starlight', mrp: '59900.00', price: '56900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', storage: '256GB', color: 'Starlight', mrp: '69900.00', price: '66900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', storage: '256GB', color: 'Space Gray', mrp: '114900.00', price: '109900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', storage: '512GB', color: 'Space Gray', mrp: '134900.00', price: '129900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', storage: '256GB', color: 'Starlight', mrp: '114900.00', price: '109900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', storage: '512GB', color: 'Starlight', mrp: '134900.00', price: '129900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', storage: '256GB', color: 'Platinum', mrp: '129900.00', price: '124900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', storage: '512GB', color: 'Platinum', mrp: '149900.00', price: '144900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', storage: '256GB', color: 'Black', mrp: '129900.00', price: '124900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', storage: '512GB', color: 'Black', mrp: '149900.00', price: '144900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'ffffffff-ffff-ffff-ffff-ffffffffffff', storage: '512GB', color: 'Eclipse Gray', mrp: '149999.00', price: '144999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'ffffffff-ffff-ffff-ffff-ffffffffffff', storage: '1TB', color: 'Eclipse Gray', mrp: '179999.00', price: '174999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
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
  
  { productId: '55555555-5555-5555-5555-555555555555', variantId: null, tenureMonths: 3, monthlyPayment: '22333.00', interestRate: '0.00', totalAmount: '66999.00', cashback: '1340.00' },
  { productId: '55555555-5555-5555-5555-555555555555', variantId: null, tenureMonths: 6, monthlyPayment: '11167.00', interestRate: '0.00', totalAmount: '67002.00', cashback: '2010.00' },
  { productId: '55555555-5555-5555-5555-555555555555', variantId: null, tenureMonths: 9, monthlyPayment: '7444.00', interestRate: '0.00', totalAmount: '66996.00', cashback: '2680.00' },
  { productId: '55555555-5555-5555-5555-555555555555', variantId: null, tenureMonths: 12, monthlyPayment: '5583.00', interestRate: '0.00', totalAmount: '66996.00', cashback: '3350.00' },
  { productId: '55555555-5555-5555-5555-555555555555', variantId: null, tenureMonths: 18, monthlyPayment: '3722.00', interestRate: '0.00', totalAmount: '66996.00', cashback: '4690.00' },
  { productId: '55555555-5555-5555-5555-555555555555', variantId: null, tenureMonths: 24, monthlyPayment: '2792.00', interestRate: '0.00', totalAmount: '67008.00', cashback: '6030.00' },
  
  { productId: '66666666-6666-6666-6666-666666666666', variantId: null, tenureMonths: 3, monthlyPayment: '28333.00', interestRate: '0.00', totalAmount: '84999.00', cashback: '1700.00' },
  { productId: '66666666-6666-6666-6666-666666666666', variantId: null, tenureMonths: 6, monthlyPayment: '14167.00', interestRate: '0.00', totalAmount: '85002.00', cashback: '2550.00' },
  { productId: '66666666-6666-6666-6666-666666666666', variantId: null, tenureMonths: 9, monthlyPayment: '9444.00', interestRate: '0.00', totalAmount: '84996.00', cashback: '3400.00' },
  { productId: '66666666-6666-6666-6666-666666666666', variantId: null, tenureMonths: 12, monthlyPayment: '7083.00', interestRate: '0.00', totalAmount: '84996.00', cashback: '4250.00' },
  { productId: '66666666-6666-6666-6666-666666666666', variantId: null, tenureMonths: 18, monthlyPayment: '4722.00', interestRate: '0.00', totalAmount: '84996.00', cashback: '5950.00' },
  { productId: '66666666-6666-6666-6666-666666666666', variantId: null, tenureMonths: 24, monthlyPayment: '3542.00', interestRate: '0.00', totalAmount: '85008.00', cashback: '7650.00' },
  
  { productId: '77777777-7777-7777-7777-777777777777', variantId: null, tenureMonths: 3, monthlyPayment: '24997.00', interestRate: '0.00', totalAmount: '74991.00', cashback: '1500.00' },
  { productId: '77777777-7777-7777-7777-777777777777', variantId: null, tenureMonths: 6, monthlyPayment: '12499.00', interestRate: '0.00', totalAmount: '74994.00', cashback: '2250.00' },
  { productId: '77777777-7777-7777-7777-777777777777', variantId: null, tenureMonths: 9, monthlyPayment: '8333.00', interestRate: '0.00', totalAmount: '74997.00', cashback: '3000.00' },
  { productId: '77777777-7777-7777-7777-777777777777', variantId: null, tenureMonths: 12, monthlyPayment: '6249.00', interestRate: '0.00', totalAmount: '74988.00', cashback: '3750.00' },
  { productId: '77777777-7777-7777-7777-777777777777', variantId: null, tenureMonths: 18, monthlyPayment: '4166.00', interestRate: '0.00', totalAmount: '74988.00', cashback: '5250.00' },
  { productId: '77777777-7777-7777-7777-777777777777', variantId: null, tenureMonths: 24, monthlyPayment: '3125.00', interestRate: '0.00', totalAmount: '75000.00', cashback: '6750.00' },
  
  { productId: '88888888-8888-8888-8888-888888888888', variantId: null, tenureMonths: 3, monthlyPayment: '58300.00', interestRate: '0.00', totalAmount: '174900.00', cashback: '3498.00' },
  { productId: '88888888-8888-8888-8888-888888888888', variantId: null, tenureMonths: 6, monthlyPayment: '29150.00', interestRate: '0.00', totalAmount: '174900.00', cashback: '5247.00' },
  { productId: '88888888-8888-8888-8888-888888888888', variantId: null, tenureMonths: 9, monthlyPayment: '19433.00', interestRate: '0.00', totalAmount: '174897.00', cashback: '6996.00' },
  { productId: '88888888-8888-8888-8888-888888888888', variantId: null, tenureMonths: 12, monthlyPayment: '14575.00', interestRate: '0.00', totalAmount: '174900.00', cashback: '8745.00' },
  { productId: '88888888-8888-8888-8888-888888888888', variantId: null, tenureMonths: 18, monthlyPayment: '9717.00', interestRate: '0.00', totalAmount: '174906.00', cashback: '12243.00' },
  { productId: '88888888-8888-8888-8888-888888888888', variantId: null, tenureMonths: 24, monthlyPayment: '7288.00', interestRate: '0.00', totalAmount: '174912.00', cashback: '15741.00' },
  
  { productId: '99999999-9999-9999-9999-999999999999', variantId: null, tenureMonths: 3, monthlyPayment: '48300.00', interestRate: '0.00', totalAmount: '144900.00', cashback: '2898.00' },
  { productId: '99999999-9999-9999-9999-999999999999', variantId: null, tenureMonths: 6, monthlyPayment: '24150.00', interestRate: '0.00', totalAmount: '144900.00', cashback: '4347.00' },
  { productId: '99999999-9999-9999-9999-999999999999', variantId: null, tenureMonths: 9, monthlyPayment: '16100.00', interestRate: '0.00', totalAmount: '144900.00', cashback: '5796.00' },
  { productId: '99999999-9999-9999-9999-999999999999', variantId: null, tenureMonths: 12, monthlyPayment: '12075.00', interestRate: '0.00', totalAmount: '144900.00', cashback: '7245.00' },
  { productId: '99999999-9999-9999-9999-999999999999', variantId: null, tenureMonths: 18, monthlyPayment: '8050.00', interestRate: '0.00', totalAmount: '144900.00', cashback: '10143.00' },
  { productId: '99999999-9999-9999-9999-999999999999', variantId: null, tenureMonths: 24, monthlyPayment: '6038.00', interestRate: '0.00', totalAmount: '144912.00', cashback: '13041.00' },
  
  { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', variantId: null, tenureMonths: 3, monthlyPayment: '51633.00', interestRate: '0.00', totalAmount: '154899.00', cashback: '3098.00' },
  { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', variantId: null, tenureMonths: 6, monthlyPayment: '25817.00', interestRate: '0.00', totalAmount: '154902.00', cashback: '4647.00' },
  { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', variantId: null, tenureMonths: 9, monthlyPayment: '17211.00', interestRate: '0.00', totalAmount: '154899.00', cashback: '6196.00' },
  { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', variantId: null, tenureMonths: 12, monthlyPayment: '12908.00', interestRate: '0.00', totalAmount: '154896.00', cashback: '7745.00' },
  { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', variantId: null, tenureMonths: 18, monthlyPayment: '8606.00', interestRate: '0.00', totalAmount: '154908.00', cashback: '10843.00' },
  { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', variantId: null, tenureMonths: 24, monthlyPayment: '6454.00', interestRate: '0.00', totalAmount: '154896.00', cashback: '13941.00' },
  
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', variantId: null, tenureMonths: 3, monthlyPayment: '38333.00', interestRate: '0.00', totalAmount: '114999.00', cashback: '2300.00' },
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', variantId: null, tenureMonths: 6, monthlyPayment: '19167.00', interestRate: '0.00', totalAmount: '115002.00', cashback: '3450.00' },
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', variantId: null, tenureMonths: 9, monthlyPayment: '12778.00', interestRate: '0.00', totalAmount: '115002.00', cashback: '4600.00' },
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', variantId: null, tenureMonths: 12, monthlyPayment: '9583.00', interestRate: '0.00', totalAmount: '114996.00', cashback: '5750.00' },
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', variantId: null, tenureMonths: 18, monthlyPayment: '6389.00', interestRate: '0.00', totalAmount: '115002.00', cashback: '8050.00' },
  { productId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', variantId: null, tenureMonths: 24, monthlyPayment: '4792.00', interestRate: '0.00', totalAmount: '115008.00', cashback: '10350.00' },
  
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', variantId: null, tenureMonths: 3, monthlyPayment: '18967.00', interestRate: '0.00', totalAmount: '56901.00', cashback: '1138.00' },
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', variantId: null, tenureMonths: 6, monthlyPayment: '9483.00', interestRate: '0.00', totalAmount: '56898.00', cashback: '1707.00' },
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', variantId: null, tenureMonths: 9, monthlyPayment: '6322.00', interestRate: '0.00', totalAmount: '56898.00', cashback: '2276.00' },
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', variantId: null, tenureMonths: 12, monthlyPayment: '4742.00', interestRate: '0.00', totalAmount: '56904.00', cashback: '2845.00' },
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', variantId: null, tenureMonths: 18, monthlyPayment: '3161.00', interestRate: '0.00', totalAmount: '56898.00', cashback: '3983.00' },
  { productId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', variantId: null, tenureMonths: 24, monthlyPayment: '2371.00', interestRate: '0.00', totalAmount: '56904.00', cashback: '5121.00' },
  
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', variantId: null, tenureMonths: 3, monthlyPayment: '36633.00', interestRate: '0.00', totalAmount: '109899.00', cashback: '2198.00' },
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', variantId: null, tenureMonths: 6, monthlyPayment: '18317.00', interestRate: '0.00', totalAmount: '109902.00', cashback: '3297.00' },
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', variantId: null, tenureMonths: 9, monthlyPayment: '12211.00', interestRate: '0.00', totalAmount: '109899.00', cashback: '4396.00' },
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', variantId: null, tenureMonths: 12, monthlyPayment: '9158.00', interestRate: '0.00', totalAmount: '109896.00', cashback: '5495.00' },
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', variantId: null, tenureMonths: 18, monthlyPayment: '6106.00', interestRate: '0.00', totalAmount: '109908.00', cashback: '7693.00' },
  { productId: 'dddddddd-dddd-dddd-dddd-dddddddddddd', variantId: null, tenureMonths: 24, monthlyPayment: '4579.00', interestRate: '0.00', totalAmount: '109896.00', cashback: '9891.00' },
  
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', variantId: null, tenureMonths: 3, monthlyPayment: '41633.00', interestRate: '0.00', totalAmount: '124899.00', cashback: '2498.00' },
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', variantId: null, tenureMonths: 6, monthlyPayment: '20817.00', interestRate: '0.00', totalAmount: '124902.00', cashback: '3747.00' },
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', variantId: null, tenureMonths: 9, monthlyPayment: '13878.00', interestRate: '0.00', totalAmount: '124902.00', cashback: '4996.00' },
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', variantId: null, tenureMonths: 12, monthlyPayment: '10408.00', interestRate: '0.00', totalAmount: '124896.00', cashback: '6245.00' },
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', variantId: null, tenureMonths: 18, monthlyPayment: '6939.00', interestRate: '0.00', totalAmount: '124902.00', cashback: '8743.00' },
  { productId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', variantId: null, tenureMonths: 24, monthlyPayment: '5204.00', interestRate: '0.00', totalAmount: '124896.00', cashback: '11241.00' },
  
  { productId: 'ffffffff-ffff-ffff-ffff-ffffffffffff', variantId: null, tenureMonths: 3, monthlyPayment: '48333.00', interestRate: '0.00', totalAmount: '144999.00', cashback: '2900.00' },
  { productId: 'ffffffff-ffff-ffff-ffff-ffffffffffff', variantId: null, tenureMonths: 6, monthlyPayment: '24167.00', interestRate: '0.00', totalAmount: '145002.00', cashback: '4350.00' },
  { productId: 'ffffffff-ffff-ffff-ffff-ffffffffffff', variantId: null, tenureMonths: 9, monthlyPayment: '16111.00', interestRate: '0.00', totalAmount: '144999.00', cashback: '5800.00' },
  { productId: 'ffffffff-ffff-ffff-ffff-ffffffffffff', variantId: null, tenureMonths: 12, monthlyPayment: '12083.00', interestRate: '0.00', totalAmount: '144996.00', cashback: '7250.00' },
  { productId: 'ffffffff-ffff-ffff-ffff-ffffffffffff', variantId: null, tenureMonths: 18, monthlyPayment: '8058.00', interestRate: '0.00', totalAmount: '145044.00', cashback: '10150.00' },
  { productId: 'ffffffff-ffff-ffff-ffff-ffffffffffff', variantId: null, tenureMonths: 24, monthlyPayment: '6042.00', interestRate: '0.00', totalAmount: '145008.00', cashback: '13050.00' },
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


