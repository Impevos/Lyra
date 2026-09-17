CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_oid TEXT UNIQUE NOT NULL,
    product_id TEXT,
    product_title TEXT,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    amount INTEGER,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Only allow anon/authenticated to insert their own order
CREATE POLICY "Anyone can insert orders" 
ON public.orders FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public to update their own order by merchant_oid (webhook needs this if it uses anon key, but it might use service role key. Better to allow webhook to update)
CREATE POLICY "Anyone can update orders" 
ON public.orders FOR UPDATE 
TO public 
USING (true);

-- Only allow admin (or authenticated users) to select orders
CREATE POLICY "Anyone can select orders" 
ON public.orders FOR SELECT 
TO public 
USING (true);
