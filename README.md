# EMI Store

A modern e-commerce platform that enables customers to purchase premium electronics (smartphones, laptops, tablets) with flexible EMI (Equated Monthly Installment) payment plans. The platform provides a seamless shopping experience with product variants, EMI plan selection, and order management.

## Table of Contents

- [Setup and Run Instructions](#i-setup-and-run-instructions)
- [API Endpoints and Example Responses](#ii-api-endpoints-and-example-responses)
- [Tech Stack Used](#iii-tech-stack-used)
- [Schema Used](#iv-schema-used)

---

## I. Setup and Run Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**, **pnpm**, or **bun** package manager
- **PostgreSQL** database (local or cloud instance)
- **Git**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd emi-store
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using pnpm:
```bash
pnpm install
```

Using bun:
```bash
bun install
```

### Step 3: Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/emi_store

# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Better Auth Configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# API URL (Optional - defaults to current origin)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 4: Database Setup

#### Option A: Using Drizzle Kit (Recommended)

1. Generate database migrations:
```bash
npm run db:generate
```

2. Push schema to database:
```bash
npm run db:push
```

3. Seed the database with sample data:
```bash
npm run db:seed
```

#### Option B: Manual SQL Setup

If you prefer to set up the database manually, you can run the SQL scripts in the `scripts/` directory in order:

1. `001_create_tables.sql` - Creates all database tables
2. `002_seed_products.sql` - Seeds product data
3. `003_seed_emi_plans.sql` - Seeds EMI plan data
4. `004_add_slug_column.sql` - Adds slug column to products
5. `005_add_more_variant_options.sql` - Adds additional variant options
6. `006_create_variant_images_table.sql` - Creates variant images table

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

---

## II. API Endpoints and Example Responses

This application uses Next.js Server Actions for API functionality. All endpoints are server-side functions that can be called from client components.

### Authentication Endpoints

#### 1. Sign Up

**Function:** `signup(email, password, fullName, phone?)`

**Request:**
```typescript
const result = await signup(
  "user@example.com",
  "password123",
  "John Doe",
  "+1234567890" // optional
)
```

**Success Response:**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "+1234567890",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "error": "User with this email already exists"
}
```

#### 2. Login

**Function:** `login(email, password)`

**Request:**
```typescript
const result = await login("user@example.com", "password123")
```

**Success Response:**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "+1234567890",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "error": "Invalid email or password"
}
```

#### 3. Get Current User

**Function:** `getCurrentUser()`

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Or `null` if not authenticated**

#### 4. Logout

**Function:** `logout()`

**Response:**
```json
{
  "success": true
}
```

#### 5. GitHub OAuth

**Endpoint:** `POST /api/auth/sign-in/social`

**Request:**
```typescript
await authClient.signIn.social({
  provider: "github"
})
```

**Response:** Redirects to GitHub OAuth flow

### Product Endpoints

#### 1. Get All Products

**Function:** `getProducts()`

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "category": "Smartphone",
    "description": "Latest iPhone with advanced features",
    "base_price": 99999,
    "image_url": "/iphone-17-pro.jpg",
    "slug": "iphone-17-pro",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### 2. Get Product by ID

**Function:** `getProductById(productId)`

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "iPhone 17 Pro",
  "brand": "Apple",
  "category": "Smartphone",
  "description": "Latest iPhone with advanced features",
  "base_price": 99999,
  "image_url": "/iphone-17-pro.jpg",
  "slug": "iphone-17-pro",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z",
  "variants": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "product_id": "550e8400-e29b-41d4-a716-446655440000",
      "storage": "256GB",
      "color": "Silver",
      "ram": "8GB",
      "connectivity": "5G",
      "mrp": 119999,
      "price": 99999,
      "image_url": "/iphone-17-pro-silver.jpg",
      "images": [
        "/iphone-17-pro-silver-front.jpg",
        "/iphone-17-pro-silver-back.jpg"
      ],
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "emi_plans": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "product_id": "550e8400-e29b-41d4-a716-446655440000",
      "variant_id": "660e8400-e29b-41d4-a716-446655440000",
      "tenure_months": 12,
      "monthly_payment": 8333.25,
      "interest_rate": 0.00,
      "total_amount": 99999,
      "cashback": 5000,
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 3. Get Product by Slug

**Function:** `getProductBySlug(slug)`

**Response:** Same as `getProductById`

#### 4. Get Featured Products

**Function:** `getFeaturedProducts()`

**Response:** Array of Product objects (same structure as `getProducts`)

#### 5. Get Related Products

**Function:** `getRelatedProducts(slug, category)`

**Request:**
```typescript
const products = await getRelatedProducts("iphone-17-pro", "Smartphone")
```

**Response:** Array of Product objects

### Order Endpoints

#### 1. Create Order

**Function:** `createOrder(userId, cartItems, shippingInfo)`

**Request:**
```typescript
const result = await createOrder(
  "550e8400-e29b-41d4-a716-446655440000",
  [
    {
      productId: "550e8400-e29b-41d4-a716-446655440000",
      productName: "iPhone 17 Pro",
      productImage: "/iphone-17-pro.jpg",
      variantStorage: "256GB",
      variantColor: "Silver",
      variantRam: "8GB",
      emiPlanId: "770e8400-e29b-41d4-a716-446655440000",
      emiPlanTenure: 12,
      monthlyPayment: 8333.25,
      totalAmount: 99999,
      cashback: 5000,
      quantity: 1
    }
  ],
  {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    landmark: "Near Park",
    paymentMethod: "emi"
  }
)
```

**Success Response:**
```json
{
  "order": {
    "id": "880e8400-e29b-41d4-a716-446655440000",
    "orderNumber": "ORD-1705312200000-1234",
    "status": "pending",
    "totalAmount": 99999,
    "totalCashback": 5000,
    "shippingName": "John Doe",
    "shippingEmail": "john@example.com",
    "shippingPhone": "+1234567890",
    "shippingAddress": "123 Main St",
    "shippingCity": "Mumbai",
    "shippingState": "Maharashtra",
    "shippingPincode": "400001",
    "shippingLandmark": "Near Park",
    "paymentMethod": "emi",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "items": [
      {
        "id": "990e8400-e29b-41d4-a716-446655440000",
        "productId": "550e8400-e29b-41d4-a716-446655440000",
        "productName": "iPhone 17 Pro",
        "productImage": "/iphone-17-pro.jpg",
        "variantStorage": "256GB",
        "variantColor": "Silver",
        "variantRam": "8GB",
        "emiPlanId": "770e8400-e29b-41d4-a716-446655440000",
        "emiPlanTenure": 12,
        "monthlyPayment": 8333.25,
        "totalAmount": 99999,
        "cashback": 5000,
        "quantity": 1
      }
    ]
  }
}
```

**Error Response:**
```json
{
  "error": "Cart is empty"
}
```

#### 2. Get Order by ID

**Function:** `getOrderById(orderId)`

**Response:** Same structure as order in `createOrder` response

**Or `null` if order not found**

#### 3. Get Orders by User ID

**Function:** `getOrdersByUserId(userId)`

**Response:**
```json
[
  {
    "id": "880e8400-e29b-41d4-a716-446655440000",
    "orderNumber": "ORD-1705312200000-1234",
    "status": "delivered",
    "totalAmount": 99999,
    "totalCashback": 5000,
    "shippingName": "John Doe",
    "shippingEmail": "john@example.com",
    "shippingPhone": "+1234567890",
    "shippingAddress": "123 Main St",
    "shippingCity": "Mumbai",
    "shippingState": "Maharashtra",
    "shippingPincode": "400001",
    "shippingLandmark": "Near Park",
    "paymentMethod": "emi",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "items": [...]
  }
]
```

### Better Auth API Endpoints

All Better Auth endpoints are available at `/api/auth/*`:

- `POST /api/auth/sign-in/email` - Email/password sign in
- `POST /api/auth/sign-up/email` - Email/password sign up
- `POST /api/auth/sign-in/social` - Social OAuth sign in (GitHub, Google)
- `GET /api/auth/callback/github` - GitHub OAuth callback
- `GET /api/auth/callback/google` - Google OAuth callback
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session

---

## III. Tech Stack Used

### Frontend

- **Next.js 16.0.0** - React framework with App Router for server-side rendering and routing
- **React 19.2.0** - UI library for building interactive user interfaces
- **TypeScript 5.9.3** - Type-safe JavaScript for better development experience
- **Tailwind CSS 4.1.9** - Utility-first CSS framework for rapid UI development
- **Framer Motion 12.23.24** - Animation library for smooth UI transitions
- **Radix UI** - Accessible, unstyled component primitives
- **Lucide React 0.454.0** - Icon library with 1000+ icons
- **React Hook Form 7.60.0** - Performant form library with easy validation
- **Zod 3.25.76** - TypeScript-first schema validation
- **Sonner 1.7.4** - Toast notification library
- **next-themes 0.4.6** - Theme management for dark/light mode support

### Backend

- **Next.js Server Actions** - Server-side functions for API logic
- **PostgreSQL** - Relational database for data persistence
- **Drizzle ORM 0.44.7** - Type-safe ORM for database operations
- **bcryptjs** - Password hashing for secure authentication
- **Better Auth 1.3.34** - Authentication library with OAuth support
- **pg 8.16.3** - PostgreSQL client for Node.js

### Development Tools

- **Drizzle Kit 0.31.6** - Database migrations and schema management
- **ESLint** - Code linting for code quality
- **tsx 4.20.6** - TypeScript execution for scripts
- **TypeScript 5.9.3** - Type checking and compilation
- **Tailwind CSS 4.1.9** - CSS framework
- **PostCSS 8.5** - CSS processing

### Additional Libraries

- **date-fns 4.1.0** - Date utility library
- **recharts 2.15.4** - Charting library
- **embla-carousel-react 8.5.1** - Carousel component
- **react-day-picker 9.8.0** - Date picker component
- **cmdk 1.0.4** - Command menu component
- **vaul 0.9.9** - Drawer component
- **input-otp 1.4.1** - OTP input component
- **@vercel/analytics** - Analytics integration

---

## IV. Schema Used

### Database Schema

The application uses PostgreSQL with the following schema structure:

#### Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_products_slug ON products(slug);
```

**Fields:**
- `id` - Unique identifier (UUID)
- `name` - Product name
- `brand` - Product brand (e.g., Apple, Samsung)
- `category` - Product category (Smartphone, Laptop, Tablet)
- `description` - Product description
- `base_price` - Base price of the product
- `image_url` - Main product image URL
- `slug` - URL-friendly identifier
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### Product Variants Table

```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  storage TEXT,
  color TEXT NOT NULL,
  ram VARCHAR(20),
  connectivity VARCHAR(50),
  mrp DECIMAL(10, 2) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
```

**Fields:**
- `id` - Unique identifier (UUID)
- `product_id` - Foreign key to products table
- `storage` - Storage capacity (e.g., "256GB", "512GB")
- `color` - Variant color
- `ram` - RAM size (e.g., "8GB", "16GB")
- `connectivity` - Connectivity options (e.g., "5G", "WiFi")
- `mrp` - Maximum Retail Price
- `price` - Selling price
- `image_url` - Variant image URL
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### Variant Images Table

```sql
CREATE TABLE variant_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_variant_images_variant_id ON variant_images(variant_id);
```

**Fields:**
- `id` - Unique identifier (UUID)
- `variant_id` - Foreign key to product_variants table
- `image_url` - Image URL
- `display_order` - Order for displaying images
- `created_at` - Creation timestamp

#### EMI Plans Table

```sql
CREATE TABLE emi_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  tenure_months INTEGER NOT NULL,
  monthly_payment DECIMAL(10, 2) NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  cashback DECIMAL(10, 2) DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_emi_plans_product_id ON emi_plans(product_id);
CREATE INDEX idx_emi_plans_variant_id ON emi_plans(variant_id);
```

**Fields:**
- `id` - Unique identifier (UUID)
- `product_id` - Foreign key to products table
- `variant_id` - Foreign key to product_variants table (optional)
- `tenure_months` - EMI tenure in months (3, 6, 9, 12, 18, 24)
- `monthly_payment` - Monthly payment amount
- `interest_rate` - Interest rate percentage
- `total_amount` - Total amount including interest
- `cashback` - Cashback amount
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_users_email ON users(email);
```

**Fields:**
- `id` - Unique identifier (UUID)
- `email` - User email (unique)
- `password` - Hashed password (bcrypt)
- `full_name` - User's full name
- `phone` - User's phone number (optional)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  status VARCHAR(50) DEFAULT 'pending' NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  total_cashback DECIMAL(10, 2) DEFAULT 0 NOT NULL,
  shipping_name TEXT NOT NULL,
  shipping_email TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_pincode TEXT NOT NULL,
  shipping_landmark TEXT,
  payment_method VARCHAR(50) DEFAULT 'emi' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
```

**Fields:**
- `id` - Unique identifier (UUID)
- `user_id` - Foreign key to users table
- `order_number` - Unique order number (e.g., "ORD-1705312200000-1234")
- `status` - Order status (pending, confirmed, shipped, delivered, cancelled)
- `total_amount` - Total order amount
- `total_cashback` - Total cashback for the order
- `shipping_name` - Shipping recipient name
- `shipping_email` - Shipping email
- `shipping_phone` - Shipping phone number
- `shipping_address` - Shipping address
- `shipping_city` - Shipping city
- `shipping_state` - Shipping state
- `shipping_pincode` - Shipping pincode
- `shipping_landmark` - Shipping landmark (optional)
- `payment_method` - Payment method (default: "emi")
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### Order Items Table

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL,
  variant_storage TEXT,
  variant_color TEXT,
  variant_ram TEXT,
  emi_plan_id TEXT NOT NULL,
  emi_plan_tenure INTEGER NOT NULL,
  monthly_payment DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  cashback DECIMAL(10, 2) DEFAULT 0 NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

**Fields:**
- `id` - Unique identifier (UUID)
- `order_id` - Foreign key to orders table
- `product_id` - Foreign key to products table
- `product_name` - Product name at time of order
- `product_image` - Product image at time of order
- `variant_storage` - Variant storage at time of order
- `variant_color` - Variant color at time of order
- `variant_ram` - Variant RAM at time of order
- `emi_plan_id` - EMI plan ID
- `emi_plan_tenure` - EMI plan tenure in months
- `monthly_payment` - Monthly payment amount
- `total_amount` - Total amount for this item
- `cashback` - Cashback for this item
- `quantity` - Quantity ordered
- `created_at` - Creation timestamp

### Relationships

- **Products** → **Product Variants** (One-to-Many)
- **Product Variants** → **Variant Images** (One-to-Many)
- **Products** → **EMI Plans** (One-to-Many)
- **Product Variants** → **EMI Plans** (One-to-Many, optional)
- **Users** → **Orders** (One-to-Many)
- **Orders** → **Order Items** (One-to-Many)
- **Products** → **Order Items** (One-to-Many)

### TypeScript Interfaces

The application uses the following TypeScript interfaces (defined in `lib/actions/`):

```typescript
interface Product {
  id: string
  name: string
  brand: string
  category: string
  description: string | null
  base_price: number
  image_url: string
  slug: string
  created_at: string
  updated_at: string
}

interface ProductVariant {
  id: string
  product_id: string
  storage: string | null
  color: string
  ram: string | null
  connectivity: string | null
  mrp: number
  price: number
  image_url: string
  images: string[]
  created_at: string
  updated_at: string
}

interface EMIPlan {
  id: string
  product_id: string
  variant_id: string | null
  tenure_months: number
  monthly_payment: number
  interest_rate: number
  total_amount: number
  cashback: number
  created_at: string
  updated_at: string
}

interface User {
  id: string
  email: string
  fullName: string
  phone: string | null
  createdAt: string
}

interface Order {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  totalCashback: number
  shippingName: string
  shippingEmail: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPincode: string
  shippingLandmark: string | null
  paymentMethod: string
  createdAt: string
  items: OrderItem[]
}

interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  variantStorage: string | null
  variantColor: string | null
  variantRam: string | null
  emiPlanId: string
  emiPlanTenure: number
  monthlyPayment: number
  totalAmount: number
  cashback: number
  quantity: number
}
```

---

## Additional Information

### Project Structure

```
emi-store/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   │   └── auth/          # Better Auth endpoints
│   ├── checkout/          # Checkout page
│   ├── login/             # Login page
│   ├── orders/            # Orders page
│   ├── product/          # Product detail pages
│   ├── products/          # Products listing page
│   ├── signup/            # Signup page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   └── ...                # Feature components
├── db/                    # Database related files
│   ├── schema.ts          # Drizzle ORM schema definitions
│   ├── index.ts           # Database connection
│   └── meta/              # Migration metadata
├── lib/                   # Utility functions and configurations
│   ├── actions/           # Server actions
│   ├── context/           # React contexts
│   ├── supabase/          # Supabase client configuration
│   └── utils.ts           # Utility functions
├── scripts/               # Database scripts
│   ├── seed.ts            # Database seeding script
│   └── *.sql              # SQL migration scripts
├── public/                # Static assets
├── auth.ts                # Better Auth configuration
└── styles/                # Global styles
```

### Features

- **Product Catalog**: Browse premium electronics with detailed product information
- **Product Variants**: Support for multiple variants including storage, color, RAM, and connectivity options
- **EMI Plans**: Flexible payment options with multiple tenure periods (3, 6, 9, 12, 18, 24 months)
- **Shopping Cart**: Add products to cart with variant selection
- **User Authentication**: Secure signup and login system with OAuth support (GitHub, Google)
- **Order Management**: Track orders with detailed order history
- **Checkout Process**: Complete checkout flow with shipping information
- **Responsive Design**: Mobile-first responsive design with dark mode support
- **Smooth Animations**: Enhanced user experience with Framer Motion animations

### Deployment

#### Build for Production

```bash
npm run build
```

#### Environment Variables for Production

Ensure all environment variables are set in your production environment:
- `DATABASE_URL`
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (for GitHub OAuth)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (for Google OAuth)
- `NEXT_PUBLIC_API_URL` (if different from default)

#### Recommended Hosting Platforms

- **Vercel** - Optimized for Next.js applications
- **Netlify** - Great for static and serverless deployments
- **Railway** - Easy PostgreSQL + Next.js deployment
- **AWS/Azure/GCP** - For enterprise deployments

---

## License

This project is private and proprietary.

## Support

For support, email support@emistore.com or open an issue in the repository.
