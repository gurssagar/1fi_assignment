-- Add more variant columns to product_variants table
ALTER TABLE product_variants
ADD COLUMN IF NOT EXISTS ram VARCHAR(20),
ADD COLUMN IF NOT EXISTS connectivity VARCHAR(50);

-- Update iPhone 17 Pro variants with RAM and connectivity options
UPDATE product_variants
SET ram = '8GB', connectivity = '5G'
WHERE product_id = '11111111-1111-1111-1111-111111111111';

-- Update Samsung Galaxy S25 Ultra variants with RAM and connectivity options
UPDATE product_variants
SET ram = '12GB', connectivity = '5G'
WHERE product_id = '22222222-2222-2222-2222-222222222222';

-- Insert additional variants with different RAM options for iPhone 17 Pro
INSERT INTO product_variants (product_id, storage, color, mrp, price, ram, connectivity, image_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '512GB', 'Natural Titanium', 159900.00, 154900.00, '12GB', '5G', '/iphone-17-pro-silver-front-view.jpg'),
  ('11111111-1111-1111-1111-111111111111', '1TB', 'Natural Titanium', 179900.00, 174900.00, '12GB', '5G', '/iphone-17-pro-silver-front-view.jpg')
ON CONFLICT DO NOTHING;
