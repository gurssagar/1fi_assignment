-- Insert iPhone 17 Pro
INSERT INTO products (id, name, brand, category, description, base_price, image_url)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'iPhone 17 Pro',
  'Apple',
  'Smartphone',
  'The latest iPhone with advanced camera system and A19 Pro chip',
  119900.00,
  '/iphone-17-pro-silver-front-view.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Insert iPhone 17 Pro variants
INSERT INTO product_variants (product_id, storage, color, mrp, price, image_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '128GB', 'Natural Titanium', 119900.00, 114900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '256GB', 'Natural Titanium', 129900.00, 124900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '512GB', 'Natural Titanium', 149900.00, 144900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '1TB', 'Natural Titanium', 169900.00, 164900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '128GB', 'Blue Titanium', 119900.00, 114900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '256GB', 'Blue Titanium', 129900.00, 124900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '128GB', 'White Titanium', 119900.00, 114900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '256GB', 'White Titanium', 129900.00, 124900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '128GB', 'Black Titanium', 119900.00, 114900.00, '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '256GB', 'Black Titanium', 129900.00, 124900.00, '/iphone-17-pro-silver-front-view.jpg')
ON CONFLICT DO NOTHING;

-- Insert Samsung Galaxy S25 Ultra
INSERT INTO products (id, name, brand, category, description, base_price, image_url)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Samsung Galaxy S25 Ultra',
  'Samsung',
  'Smartphone',
  'Premium Android flagship with S Pen and advanced AI features',
  129999.00,
  '/samsung-galaxy-s25-ultra-smartphone-black.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Insert Samsung Galaxy S25 Ultra variants
INSERT INTO product_variants (product_id, storage, color, mrp, price, image_url)
VALUES 
  ('22222222-2222-2222-2222-222222222222', '256GB', 'Titanium Black', 129999.00, 124999.00, '/samsung-galaxy-s25-ultra-smartphone-black.jpg'),
  ('22222222-2222-2222-2222-222222222222', '512GB', 'Titanium Black', 139999.00, 134999.00, '/samsung-galaxy-s25-ultra-smartphone-black.jpg'),
  ('22222222-2222-2222-2222-222222222222', '256GB', 'Titanium Gray', 129999.00, 124999.00, '/samsung-galaxy-s25-ultra-smartphone-black.jpg'),
  ('22222222-2222-2222-2222-222222222222', '512GB', 'Titanium Gray', 139999.00, 134999.00, '/samsung-galaxy-s25-ultra-smartphone-black.jpg')
ON CONFLICT DO NOTHING;

-- Insert MacBook Pro M4
INSERT INTO products (id, name, brand, category, description, base_price, image_url)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'MacBook Pro M4',
  'Apple',
  'Laptop',
  'Powerful laptop with M4 chip for professionals',
  199900.00,
  '/macbook-pro-m4-laptop-silver.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Insert MacBook Pro M4 variants
INSERT INTO product_variants (product_id, storage, color, mrp, price, image_url)
VALUES 
  ('33333333-3333-3333-3333-333333333333', '512GB', 'Space Gray', 199900.00, 194900.00, '/macbook-pro-m4-laptop-silver.jpg'),
  ('33333333-3333-3333-3333-333333333333', '1TB', 'Space Gray', 229900.00, 224900.00, '/macbook-pro-m4-laptop-silver.jpg'),
  ('33333333-3333-3333-3333-333333333333', '512GB', 'Silver', 199900.00, 194900.00, '/macbook-pro-m4-laptop-silver.jpg'),
  ('33333333-3333-3333-3333-333333333333', '1TB', 'Silver', 229900.00, 224900.00, '/macbook-pro-m4-laptop-silver.jpg')
ON CONFLICT DO NOTHING;

-- Insert iPad Pro 13-inch
INSERT INTO products (id, name, brand, category, description, base_price, image_url)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'iPad Pro 13-inch',
  'Apple',
  'Tablet',
  'Ultimate iPad experience with M4 chip',
  109900.00,
  '/ipad-pro-13-inch-tablet-space-gray.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Insert iPad Pro 13-inch variants
INSERT INTO product_variants (product_id, storage, color, mrp, price, image_url)
VALUES 
  ('44444444-4444-4444-4444-444444444444', '256GB', 'Space Gray', 109900.00, 104900.00, '/ipad-pro-13-inch-tablet-space-gray.jpg'),
  ('44444444-4444-4444-4444-444444444444', '512GB', 'Space Gray', 129900.00, 124900.00, '/ipad-pro-13-inch-tablet-space-gray.jpg'),
  ('44444444-4444-4444-4444-444444444444', '256GB', 'Silver', 109900.00, 104900.00, '/ipad-pro-13-inch-tablet-space-gray.jpg'),
  ('44444444-4444-4444-4444-444444444444', '512GB', 'Silver', 129900.00, 124900.00, '/ipad-pro-13-inch-tablet-space-gray.jpg')
ON CONFLICT DO NOTHING;
