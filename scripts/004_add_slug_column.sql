-- Add slug column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create index for slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Update existing products with slugs
UPDATE products SET slug = 'iphone-17-pro' WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE products SET slug = 'samsung-galaxy-s25-ultra' WHERE id = '22222222-2222-2222-2222-222222222222';
UPDATE products SET slug = 'macbook-pro-m4' WHERE id = '33333333-3333-3333-3333-333333333333';
UPDATE products SET slug = 'ipad-pro-13-inch' WHERE id = '44444444-4444-4444-4444-444444444444';

-- Make slug NOT NULL after updating existing records
ALTER TABLE products ALTER COLUMN slug SET NOT NULL;
