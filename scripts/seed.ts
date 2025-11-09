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
  {
    id: '10101010-1010-1010-1010-101010101010',
    name: 'Vivo X100 Pro',
    brand: 'Vivo',
    category: 'Smartphone',
    description: 'Flagship smartphone with Zeiss camera and MediaTek Dimensity 9300',
    basePrice: '79999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'vivo-x100-pro',
  },
  {
    id: '20202020-2020-2020-2020-202020202020',
    name: 'Oppo Find X7 Ultra',
    brand: 'Oppo',
    category: 'Smartphone',
    description: 'Premium smartphone with dual periscope cameras and Snapdragon 8 Gen 3',
    basePrice: '89999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'oppo-find-x7-ultra',
  },
  {
    id: '30303030-3030-3030-3030-303030303030',
    name: 'Realme GT 6',
    brand: 'Realme',
    category: 'Smartphone',
    description: 'Performance-focused smartphone with Snapdragon 8s Gen 3 and 120W fast charging',
    basePrice: '39999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'realme-gt-6',
  },
  {
    id: '40404040-4040-4040-4040-404040404040',
    name: 'Nothing Phone 3',
    brand: 'Nothing',
    category: 'Smartphone',
    description: 'Unique transparent design with Glyph interface and flagship performance',
    basePrice: '49999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'nothing-phone-3',
  },
  {
    id: '50505050-5050-5050-5050-505050505050',
    name: 'Motorola Edge 50 Ultra',
    brand: 'Motorola',
    category: 'Smartphone',
    description: 'Premium smartphone with 125W TurboPower charging and Snapdragon 8s Gen 3',
    basePrice: '54999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'motorola-edge-50-ultra',
  },
  {
    id: '60606060-6060-6060-6060-606060606060',
    name: 'Acer Predator Helios 18',
    brand: 'Acer',
    category: 'Laptop',
    description: 'Gaming laptop with RTX 4080 and 18-inch display',
    basePrice: '199999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'acer-predator-helios-18',
  },
  {
    id: '70707070-7070-7070-7070-707070707070',
    name: 'MSI Stealth 16 Studio',
    brand: 'MSI',
    category: 'Laptop',
    description: 'Sleek gaming laptop with RTX 4070 and professional-grade display',
    basePrice: '169999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'msi-stealth-16-studio',
  },
  {
    id: '80808080-8080-8080-8080-808080808080',
    name: 'Razer Blade 16',
    brand: 'Razer',
    category: 'Laptop',
    description: 'Premium gaming laptop with dual-mode mini-LED display and RTX 4090',
    basePrice: '349999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'razer-blade-16',
  },
  {
    id: '90909090-9090-9090-9090-909090909090',
    name: 'LG Gram 17',
    brand: 'LG',
    category: 'Laptop',
    description: 'Ultra-lightweight 17-inch laptop with all-day battery life',
    basePrice: '139999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'lg-gram-17',
  },
  {
    id: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    name: 'Samsung Galaxy Book4 Ultra',
    brand: 'Samsung',
    category: 'Laptop',
    description: 'Premium laptop with AMOLED display and Intel Core i9 processor',
    basePrice: '249999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'samsung-galaxy-book4-ultra',
  },
  {
    id: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0',
    name: 'iPad Mini 7',
    brand: 'Apple',
    category: 'Tablet',
    description: 'Compact tablet with A17 Pro chip and 8.3-inch display',
    basePrice: '49900.00',
    imageUrl: '/placeholder.jpg',
    slug: 'ipad-mini-7',
  },
  {
    id: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0',
    name: 'Microsoft Surface Pro 11',
    brand: 'Microsoft',
    category: 'Tablet',
    description: '2-in-1 tablet with Snapdragon X Elite and detachable keyboard',
    basePrice: '99999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'microsoft-surface-pro-11',
  },
  {
    id: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0',
    name: 'OnePlus Pad 2',
    brand: 'OnePlus',
    category: 'Tablet',
    description: 'Premium Android tablet with Snapdragon 8 Gen 3 and 144Hz display',
    basePrice: '39999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'oneplus-pad-2',
  },
  {
    id: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0',
    name: 'Xiaomi Pad 7 Pro',
    brand: 'Xiaomi',
    category: 'Tablet',
    description: 'High-performance tablet with Snapdragon 8 Gen 3 and 12.1-inch display',
    basePrice: '44999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'xiaomi-pad-7-pro',
  },
  {
    id: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0',
    name: 'Lenovo Yoga Book 9i',
    brand: 'Lenovo',
    category: 'Laptop',
    description: 'Dual-screen laptop with innovative design and Intel Core i9',
    basePrice: '199999.00',
    imageUrl: '/placeholder.jpg',
    slug: 'lenovo-yoga-book-9i',
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
  
  { productId: '10101010-1010-1010-1010-101010101010', storage: '256GB', color: 'Stellar Black', mrp: '79999.00', price: '75999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '10101010-1010-1010-1010-101010101010', storage: '512GB', color: 'Stellar Black', mrp: '89999.00', price: '85999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '10101010-1010-1010-1010-101010101010', storage: '256GB', color: 'Sunset Orange', mrp: '79999.00', price: '75999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '10101010-1010-1010-1010-101010101010', storage: '512GB', color: 'Sunset Orange', mrp: '89999.00', price: '85999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  
  { productId: '20202020-2020-2020-2020-202020202020', storage: '256GB', color: 'Ocean Blue', mrp: '89999.00', price: '84999.00', ram: '16GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '20202020-2020-2020-2020-202020202020', storage: '512GB', color: 'Ocean Blue', mrp: '99999.00', price: '94999.00', ram: '16GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '20202020-2020-2020-2020-202020202020', storage: '256GB', color: 'Mocha Brown', mrp: '89999.00', price: '84999.00', ram: '16GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '20202020-2020-2020-2020-202020202020', storage: '512GB', color: 'Mocha Brown', mrp: '99999.00', price: '94999.00', ram: '16GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  
  { productId: '30303030-3030-3030-3030-303030303030', storage: '256GB', color: 'Fluid Silver', mrp: '39999.00', price: '37999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '30303030-3030-3030-3030-303030303030', storage: '512GB', color: 'Fluid Silver', mrp: '44999.00', price: '42999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '30303030-3030-3030-3030-303030303030', storage: '256GB', color: 'Razor Green', mrp: '39999.00', price: '37999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '30303030-3030-3030-3030-303030303030', storage: '512GB', color: 'Razor Green', mrp: '44999.00', price: '42999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  
  { productId: '40404040-4040-4040-4040-404040404040', storage: '256GB', color: 'White', mrp: '49999.00', price: '46999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '40404040-4040-4040-4040-404040404040', storage: '512GB', color: 'White', mrp: '59999.00', price: '56999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '40404040-4040-4040-4040-404040404040', storage: '256GB', color: 'Black', mrp: '49999.00', price: '46999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '40404040-4040-4040-4040-404040404040', storage: '512GB', color: 'Black', mrp: '59999.00', price: '56999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  
  { productId: '50505050-5050-5050-5050-505050505050', storage: '256GB', color: 'Peach Fuzz', mrp: '54999.00', price: '51999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '50505050-5050-5050-5050-505050505050', storage: '512GB', color: 'Peach Fuzz', mrp: '64999.00', price: '61999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '50505050-5050-5050-5050-505050505050', storage: '256GB', color: 'Forest Grey', mrp: '54999.00', price: '51999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  { productId: '50505050-5050-5050-5050-505050505050', storage: '512GB', color: 'Forest Grey', mrp: '64999.00', price: '61999.00', ram: '12GB', connectivity: '5G', imageUrl: '/placeholder.jpg' },
  
  { productId: '60606060-6060-6060-6060-606060606060', storage: '1TB', color: 'Abyssal Black', mrp: '199999.00', price: '194999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '60606060-6060-6060-6060-606060606060', storage: '2TB', color: 'Abyssal Black', mrp: '239999.00', price: '234999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '60606060-6060-6060-6060-606060606060', storage: '1TB', color: 'Steel Gray', mrp: '199999.00', price: '194999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '60606060-6060-6060-6060-606060606060', storage: '2TB', color: 'Steel Gray', mrp: '239999.00', price: '234999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: '70707070-7070-7070-7070-707070707070', storage: '1TB', color: 'Core Black', mrp: '169999.00', price: '164999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '70707070-7070-7070-7070-707070707070', storage: '2TB', color: 'Core Black', mrp: '199999.00', price: '194999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '70707070-7070-7070-7070-707070707070', storage: '1TB', color: 'Stealth Silver', mrp: '169999.00', price: '164999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '70707070-7070-7070-7070-707070707070', storage: '2TB', color: 'Stealth Silver', mrp: '199999.00', price: '194999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: '80808080-8080-8080-8080-808080808080', storage: '1TB', color: 'Mercury', mrp: '349999.00', price: '339999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '80808080-8080-8080-8080-808080808080', storage: '2TB', color: 'Mercury', mrp: '399999.00', price: '389999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '80808080-8080-8080-8080-808080808080', storage: '1TB', color: 'Matte Black', mrp: '349999.00', price: '339999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '80808080-8080-8080-8080-808080808080', storage: '2TB', color: 'Matte Black', mrp: '399999.00', price: '389999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: '90909090-9090-9090-9090-909090909090', storage: '512GB', color: 'Obsidian Black', mrp: '139999.00', price: '134999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '90909090-9090-9090-9090-909090909090', storage: '1TB', color: 'Obsidian Black', mrp: '159999.00', price: '154999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '90909090-9090-9090-9090-909090909090', storage: '512GB', color: 'Arctic White', mrp: '139999.00', price: '134999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: '90909090-9090-9090-9090-909090909090', storage: '1TB', color: 'Arctic White', mrp: '159999.00', price: '154999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', storage: '1TB', color: 'Titanium Gray', mrp: '249999.00', price: '239999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', storage: '2TB', color: 'Titanium Gray', mrp: '299999.00', price: '289999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', storage: '1TB', color: 'Graphite', mrp: '249999.00', price: '239999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', storage: '2TB', color: 'Graphite', mrp: '299999.00', price: '289999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', storage: '128GB', color: 'Space Gray', mrp: '49900.00', price: '46900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', storage: '256GB', color: 'Space Gray', mrp: '59900.00', price: '56900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', storage: '128GB', color: 'Starlight', mrp: '49900.00', price: '46900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', storage: '256GB', color: 'Starlight', mrp: '59900.00', price: '56900.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', storage: '256GB', color: 'Platinum', mrp: '99999.00', price: '94999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', storage: '512GB', color: 'Platinum', mrp: '119999.00', price: '114999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', storage: '256GB', color: 'Graphite', mrp: '99999.00', price: '94999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', storage: '512GB', color: 'Graphite', mrp: '119999.00', price: '114999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', storage: '128GB', color: 'Halo Green', mrp: '39999.00', price: '37999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', storage: '256GB', color: 'Halo Green', mrp: '49999.00', price: '47999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', storage: '128GB', color: 'Storm Gray', mrp: '39999.00', price: '37999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', storage: '256GB', color: 'Storm Gray', mrp: '49999.00', price: '47999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', storage: '256GB', color: 'Graphite Gray', mrp: '44999.00', price: '42999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', storage: '512GB', color: 'Graphite Gray', mrp: '54999.00', price: '52999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', storage: '256GB', color: 'Ocean Blue', mrp: '44999.00', price: '42999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', storage: '512GB', color: 'Ocean Blue', mrp: '54999.00', price: '52999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', storage: '512GB', color: 'Shadow Black', mrp: '199999.00', price: '194999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', storage: '1TB', color: 'Shadow Black', mrp: '229999.00', price: '224999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', storage: '512GB', color: 'Tidal Teal', mrp: '199999.00', price: '194999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', storage: '1TB', color: 'Tidal Teal', mrp: '229999.00', price: '224999.00', ram: null, connectivity: null, imageUrl: '/placeholder.jpg' },
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
  
  { productId: '10101010-1010-1010-1010-101010101010', variantId: null, tenureMonths: 3, monthlyPayment: '25333.00', interestRate: '0.00', totalAmount: '75999.00', cashback: '1520.00' },
  { productId: '10101010-1010-1010-1010-101010101010', variantId: null, tenureMonths: 6, monthlyPayment: '12667.00', interestRate: '0.00', totalAmount: '76002.00', cashback: '2280.00' },
  { productId: '10101010-1010-1010-1010-101010101010', variantId: null, tenureMonths: 9, monthlyPayment: '8444.00', interestRate: '0.00', totalAmount: '75996.00', cashback: '3040.00' },
  { productId: '10101010-1010-1010-1010-101010101010', variantId: null, tenureMonths: 12, monthlyPayment: '6333.00', interestRate: '0.00', totalAmount: '75996.00', cashback: '3800.00' },
  { productId: '10101010-1010-1010-1010-101010101010', variantId: null, tenureMonths: 18, monthlyPayment: '4222.00', interestRate: '0.00', totalAmount: '75996.00', cashback: '5320.00' },
  { productId: '10101010-1010-1010-1010-101010101010', variantId: null, tenureMonths: 24, monthlyPayment: '3167.00', interestRate: '0.00', totalAmount: '76008.00', cashback: '6840.00' },
  
  { productId: '20202020-2020-2020-2020-202020202020', variantId: null, tenureMonths: 3, monthlyPayment: '28333.00', interestRate: '0.00', totalAmount: '84999.00', cashback: '1700.00' },
  { productId: '20202020-2020-2020-2020-202020202020', variantId: null, tenureMonths: 6, monthlyPayment: '14167.00', interestRate: '0.00', totalAmount: '85002.00', cashback: '2550.00' },
  { productId: '20202020-2020-2020-2020-202020202020', variantId: null, tenureMonths: 9, monthlyPayment: '9444.00', interestRate: '0.00', totalAmount: '84996.00', cashback: '3400.00' },
  { productId: '20202020-2020-2020-2020-202020202020', variantId: null, tenureMonths: 12, monthlyPayment: '7083.00', interestRate: '0.00', totalAmount: '84996.00', cashback: '4250.00' },
  { productId: '20202020-2020-2020-2020-202020202020', variantId: null, tenureMonths: 18, monthlyPayment: '4722.00', interestRate: '0.00', totalAmount: '84996.00', cashback: '5950.00' },
  { productId: '20202020-2020-2020-2020-202020202020', variantId: null, tenureMonths: 24, monthlyPayment: '3542.00', interestRate: '0.00', totalAmount: '85008.00', cashback: '7650.00' },
  
  { productId: '30303030-3030-3030-3030-303030303030', variantId: null, tenureMonths: 3, monthlyPayment: '12667.00', interestRate: '0.00', totalAmount: '38001.00', cashback: '760.00' },
  { productId: '30303030-3030-3030-3030-303030303030', variantId: null, tenureMonths: 6, monthlyPayment: '6333.00', interestRate: '0.00', totalAmount: '37998.00', cashback: '1140.00' },
  { productId: '30303030-3030-3030-3030-303030303030', variantId: null, tenureMonths: 9, monthlyPayment: '4222.00', interestRate: '0.00', totalAmount: '37998.00', cashback: '1520.00' },
  { productId: '30303030-3030-3030-3030-303030303030', variantId: null, tenureMonths: 12, monthlyPayment: '3167.00', interestRate: '0.00', totalAmount: '38004.00', cashback: '1900.00' },
  { productId: '30303030-3030-3030-3030-303030303030', variantId: null, tenureMonths: 18, monthlyPayment: '2111.00', interestRate: '0.00', totalAmount: '37998.00', cashback: '2660.00' },
  { productId: '30303030-3030-3030-3030-303030303030', variantId: null, tenureMonths: 24, monthlyPayment: '1583.00', interestRate: '0.00', totalAmount: '37992.00', cashback: '3420.00' },
  
  { productId: '40404040-4040-4040-4040-404040404040', variantId: null, tenureMonths: 3, monthlyPayment: '15667.00', interestRate: '0.00', totalAmount: '47001.00', cashback: '940.00' },
  { productId: '40404040-4040-4040-4040-404040404040', variantId: null, tenureMonths: 6, monthlyPayment: '7833.00', interestRate: '0.00', totalAmount: '46998.00', cashback: '1410.00' },
  { productId: '40404040-4040-4040-4040-404040404040', variantId: null, tenureMonths: 9, monthlyPayment: '5222.00', interestRate: '0.00', totalAmount: '46998.00', cashback: '1880.00' },
  { productId: '40404040-4040-4040-4040-404040404040', variantId: null, tenureMonths: 12, monthlyPayment: '3917.00', interestRate: '0.00', totalAmount: '47004.00', cashback: '2350.00' },
  { productId: '40404040-4040-4040-4040-404040404040', variantId: null, tenureMonths: 18, monthlyPayment: '2611.00', interestRate: '0.00', totalAmount: '46998.00', cashback: '3290.00' },
  { productId: '40404040-4040-4040-4040-404040404040', variantId: null, tenureMonths: 24, monthlyPayment: '1958.00', interestRate: '0.00', totalAmount: '46992.00', cashback: '4230.00' },
  
  { productId: '50505050-5050-5050-5050-505050505050', variantId: null, tenureMonths: 3, monthlyPayment: '17333.00', interestRate: '0.00', totalAmount: '51999.00', cashback: '1040.00' },
  { productId: '50505050-5050-5050-5050-505050505050', variantId: null, tenureMonths: 6, monthlyPayment: '8667.00', interestRate: '0.00', totalAmount: '52002.00', cashback: '1560.00' },
  { productId: '50505050-5050-5050-5050-505050505050', variantId: null, tenureMonths: 9, monthlyPayment: '5778.00', interestRate: '0.00', totalAmount: '52002.00', cashback: '2080.00' },
  { productId: '50505050-5050-5050-5050-505050505050', variantId: null, tenureMonths: 12, monthlyPayment: '4333.00', interestRate: '0.00', totalAmount: '51996.00', cashback: '2600.00' },
  { productId: '50505050-5050-5050-5050-505050505050', variantId: null, tenureMonths: 18, monthlyPayment: '2889.00', interestRate: '0.00', totalAmount: '52002.00', cashback: '3640.00' },
  { productId: '50505050-5050-5050-5050-505050505050', variantId: null, tenureMonths: 24, monthlyPayment: '2167.00', interestRate: '0.00', totalAmount: '52008.00', cashback: '4680.00' },
  
  { productId: '60606060-6060-6060-6060-606060606060', variantId: null, tenureMonths: 3, monthlyPayment: '64967.00', interestRate: '0.00', totalAmount: '194901.00', cashback: '3898.00' },
  { productId: '60606060-6060-6060-6060-606060606060', variantId: null, tenureMonths: 6, monthlyPayment: '32483.00', interestRate: '0.00', totalAmount: '194898.00', cashback: '5847.00' },
  { productId: '60606060-6060-6060-6060-606060606060', variantId: null, tenureMonths: 9, monthlyPayment: '21656.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '7796.00' },
  { productId: '60606060-6060-6060-6060-606060606060', variantId: null, tenureMonths: 12, monthlyPayment: '16242.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '9745.00' },
  { productId: '60606060-6060-6060-6060-606060606060', variantId: null, tenureMonths: 18, monthlyPayment: '10828.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '13643.00' },
  { productId: '60606060-6060-6060-6060-606060606060', variantId: null, tenureMonths: 24, monthlyPayment: '8121.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '17541.00' },
  
  { productId: '70707070-7070-7070-7070-707070707070', variantId: null, tenureMonths: 3, monthlyPayment: '54967.00', interestRate: '0.00', totalAmount: '164901.00', cashback: '3298.00' },
  { productId: '70707070-7070-7070-7070-707070707070', variantId: null, tenureMonths: 6, monthlyPayment: '27483.00', interestRate: '0.00', totalAmount: '164898.00', cashback: '4947.00' },
  { productId: '70707070-7070-7070-7070-707070707070', variantId: null, tenureMonths: 9, monthlyPayment: '18322.00', interestRate: '0.00', totalAmount: '164898.00', cashback: '6596.00' },
  { productId: '70707070-7070-7070-7070-707070707070', variantId: null, tenureMonths: 12, monthlyPayment: '13742.00', interestRate: '0.00', totalAmount: '164904.00', cashback: '8245.00' },
  { productId: '70707070-7070-7070-7070-707070707070', variantId: null, tenureMonths: 18, monthlyPayment: '9161.00', interestRate: '0.00', totalAmount: '164898.00', cashback: '11543.00' },
  { productId: '70707070-7070-7070-7070-707070707070', variantId: null, tenureMonths: 24, monthlyPayment: '6871.00', interestRate: '0.00', totalAmount: '164904.00', cashback: '14841.00' },
  
  { productId: '80808080-8080-8080-8080-808080808080', variantId: null, tenureMonths: 3, monthlyPayment: '113333.00', interestRate: '0.00', totalAmount: '339999.00', cashback: '6800.00' },
  { productId: '80808080-8080-8080-8080-808080808080', variantId: null, tenureMonths: 6, monthlyPayment: '56667.00', interestRate: '0.00', totalAmount: '340002.00', cashback: '10200.00' },
  { productId: '80808080-8080-8080-8080-808080808080', variantId: null, tenureMonths: 9, monthlyPayment: '37778.00', interestRate: '0.00', totalAmount: '340002.00', cashback: '13600.00' },
  { productId: '80808080-8080-8080-8080-808080808080', variantId: null, tenureMonths: 12, monthlyPayment: '28333.00', interestRate: '0.00', totalAmount: '339996.00', cashback: '17000.00' },
  { productId: '80808080-8080-8080-8080-808080808080', variantId: null, tenureMonths: 18, monthlyPayment: '18889.00', interestRate: '0.00', totalAmount: '340002.00', cashback: '23800.00' },
  { productId: '80808080-8080-8080-8080-808080808080', variantId: null, tenureMonths: 24, monthlyPayment: '14167.00', interestRate: '0.00', totalAmount: '340008.00', cashback: '30600.00' },
  
  { productId: '90909090-9090-9090-9090-909090909090', variantId: null, tenureMonths: 3, monthlyPayment: '44967.00', interestRate: '0.00', totalAmount: '134901.00', cashback: '2698.00' },
  { productId: '90909090-9090-9090-9090-909090909090', variantId: null, tenureMonths: 6, monthlyPayment: '22483.00', interestRate: '0.00', totalAmount: '134898.00', cashback: '4047.00' },
  { productId: '90909090-9090-9090-9090-909090909090', variantId: null, tenureMonths: 9, monthlyPayment: '14989.00', interestRate: '0.00', totalAmount: '134901.00', cashback: '5396.00' },
  { productId: '90909090-9090-9090-9090-909090909090', variantId: null, tenureMonths: 12, monthlyPayment: '11242.00', interestRate: '0.00', totalAmount: '134904.00', cashback: '6745.00' },
  { productId: '90909090-9090-9090-9090-909090909090', variantId: null, tenureMonths: 18, monthlyPayment: '7494.00', interestRate: '0.00', totalAmount: '134892.00', cashback: '9443.00' },
  { productId: '90909090-9090-9090-9090-909090909090', variantId: null, tenureMonths: 24, monthlyPayment: '5621.00', interestRate: '0.00', totalAmount: '134904.00', cashback: '12141.00' },
  
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', variantId: null, tenureMonths: 3, monthlyPayment: '79967.00', interestRate: '0.00', totalAmount: '239901.00', cashback: '4798.00' },
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', variantId: null, tenureMonths: 6, monthlyPayment: '39983.00', interestRate: '0.00', totalAmount: '239898.00', cashback: '7197.00' },
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', variantId: null, tenureMonths: 9, monthlyPayment: '26656.00', interestRate: '0.00', totalAmount: '239904.00', cashback: '9596.00' },
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', variantId: null, tenureMonths: 12, monthlyPayment: '19992.00', interestRate: '0.00', totalAmount: '239904.00', cashback: '11995.00' },
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', variantId: null, tenureMonths: 18, monthlyPayment: '13328.00', interestRate: '0.00', totalAmount: '239904.00', cashback: '16793.00' },
  { productId: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', variantId: null, tenureMonths: 24, monthlyPayment: '9996.00', interestRate: '0.00', totalAmount: '239904.00', cashback: '21591.00' },
  
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', variantId: null, tenureMonths: 3, monthlyPayment: '15633.00', interestRate: '0.00', totalAmount: '46899.00', cashback: '938.00' },
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', variantId: null, tenureMonths: 6, monthlyPayment: '7817.00', interestRate: '0.00', totalAmount: '46902.00', cashback: '1407.00' },
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', variantId: null, tenureMonths: 9, monthlyPayment: '5211.00', interestRate: '0.00', totalAmount: '46899.00', cashback: '1876.00' },
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', variantId: null, tenureMonths: 12, monthlyPayment: '3908.00', interestRate: '0.00', totalAmount: '46896.00', cashback: '2345.00' },
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', variantId: null, tenureMonths: 18, monthlyPayment: '2606.00', interestRate: '0.00', totalAmount: '46908.00', cashback: '3283.00' },
  { productId: 'b0b0b0b0-b0b0-b0b0-b0b0-b0b0b0b0b0b0', variantId: null, tenureMonths: 24, monthlyPayment: '1954.00', interestRate: '0.00', totalAmount: '46896.00', cashback: '4221.00' },
  
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', variantId: null, tenureMonths: 3, monthlyPayment: '31633.00', interestRate: '0.00', totalAmount: '94899.00', cashback: '1898.00' },
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', variantId: null, tenureMonths: 6, monthlyPayment: '15817.00', interestRate: '0.00', totalAmount: '94902.00', cashback: '2847.00' },
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', variantId: null, tenureMonths: 9, monthlyPayment: '10544.00', interestRate: '0.00', totalAmount: '94896.00', cashback: '3796.00' },
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', variantId: null, tenureMonths: 12, monthlyPayment: '7908.00', interestRate: '0.00', totalAmount: '94896.00', cashback: '4745.00' },
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', variantId: null, tenureMonths: 18, monthlyPayment: '5272.00', interestRate: '0.00', totalAmount: '94896.00', cashback: '6643.00' },
  { productId: 'c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0', variantId: null, tenureMonths: 24, monthlyPayment: '3954.00', interestRate: '0.00', totalAmount: '94896.00', cashback: '8541.00' },
  
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', variantId: null, tenureMonths: 3, monthlyPayment: '12667.00', interestRate: '0.00', totalAmount: '38001.00', cashback: '760.00' },
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', variantId: null, tenureMonths: 6, monthlyPayment: '6333.00', interestRate: '0.00', totalAmount: '37998.00', cashback: '1140.00' },
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', variantId: null, tenureMonths: 9, monthlyPayment: '4222.00', interestRate: '0.00', totalAmount: '37998.00', cashback: '1520.00' },
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', variantId: null, tenureMonths: 12, monthlyPayment: '3167.00', interestRate: '0.00', totalAmount: '38004.00', cashback: '1900.00' },
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', variantId: null, tenureMonths: 18, monthlyPayment: '2111.00', interestRate: '0.00', totalAmount: '37998.00', cashback: '2660.00' },
  { productId: 'd0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0', variantId: null, tenureMonths: 24, monthlyPayment: '1583.00', interestRate: '0.00', totalAmount: '37992.00', cashback: '3420.00' },
  
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', variantId: null, tenureMonths: 3, monthlyPayment: '14333.00', interestRate: '0.00', totalAmount: '42999.00', cashback: '860.00' },
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', variantId: null, tenureMonths: 6, monthlyPayment: '7167.00', interestRate: '0.00', totalAmount: '43002.00', cashback: '1290.00' },
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', variantId: null, tenureMonths: 9, monthlyPayment: '4778.00', interestRate: '0.00', totalAmount: '43002.00', cashback: '1720.00' },
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', variantId: null, tenureMonths: 12, monthlyPayment: '3583.00', interestRate: '0.00', totalAmount: '42996.00', cashback: '2150.00' },
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', variantId: null, tenureMonths: 18, monthlyPayment: '2389.00', interestRate: '0.00', totalAmount: '43002.00', cashback: '3010.00' },
  { productId: 'e0e0e0e0-e0e0-e0e0-e0e0-e0e0e0e0e0e0', variantId: null, tenureMonths: 24, monthlyPayment: '1792.00', interestRate: '0.00', totalAmount: '43008.00', cashback: '3870.00' },
  
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', variantId: null, tenureMonths: 3, monthlyPayment: '64967.00', interestRate: '0.00', totalAmount: '194901.00', cashback: '3898.00' },
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', variantId: null, tenureMonths: 6, monthlyPayment: '32483.00', interestRate: '0.00', totalAmount: '194898.00', cashback: '5847.00' },
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', variantId: null, tenureMonths: 9, monthlyPayment: '21656.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '7796.00' },
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', variantId: null, tenureMonths: 12, monthlyPayment: '16242.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '9745.00' },
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', variantId: null, tenureMonths: 18, monthlyPayment: '10828.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '13643.00' },
  { productId: 'f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0', variantId: null, tenureMonths: 24, monthlyPayment: '8121.00', interestRate: '0.00', totalAmount: '194904.00', cashback: '17541.00' },
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


