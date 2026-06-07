-- C&J Pawn & Games — Supabase Schema
-- Run this in your Supabase SQL editor

-- Inventory table
CREATE TABLE inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  condition TEXT CHECK (condition IN ('Excellent','Good','Fair','Poor')) NOT NULL DEFAULT 'Good',
  category TEXT,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_email TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  total_amount NUMERIC(10,2),
  stripe_payment_id TEXT,
  shipping_address JSONB,
  items JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Inventory: anyone can read
CREATE POLICY "Public can read inventory"
  ON inventory FOR SELECT
  TO anon, authenticated
  USING (true);

-- Inventory: only authenticated users (admin) can write
CREATE POLICY "Admin can insert inventory"
  ON inventory FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update inventory"
  ON inventory FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin can delete inventory"
  ON inventory FOR DELETE
  TO authenticated
  USING (true);

-- Orders: anyone can place an order
CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Orders: only authenticated users (admin) can read
CREATE POLICY "Admin can read orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

-- Sample inventory data to get you started
INSERT INTO inventory (name, description, price, condition, category, stock_quantity) VALUES
  ('PlayStation 5 Console', 'Disc edition, fully tested, all cables included.', 399.99, 'Good', 'Electronics', 1),
  ('Fender Stratocaster', 'MIM Strat in sunburst. Light play wear, great tone.', 449.00, 'Good', 'Instruments', 1),
  ('Nintendo Switch OLED', 'White model with dock, Joy-Cons, and charger.', 249.99, 'Excellent', 'Electronics', 2),
  ('DeWalt 20V Drill Set', 'Includes two batteries, charger, and case.', 89.00, 'Good', 'Tools', 1),
  ('14k Gold Chain Necklace', '18 inch, 3mm box chain. Tested and authenticated.', 185.00, 'Excellent', 'Jewelry', 1),
  ('Xbox Series X', 'Fully tested, includes controller and HDMI cable.', 329.99, 'Fair', 'Electronics', 1);
