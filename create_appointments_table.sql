-- Appointments Table Definition
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    product_title TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    instagram TEXT,
    date TEXT,
    time TEXT,
    expectations TEXT,
    about_self TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public to insert appointments / registrations
CREATE POLICY "Anyone can insert appointments" 
ON public.appointments FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public to select appointments (admin or verification)
CREATE POLICY "Anyone can select appointments" 
ON public.appointments FOR SELECT 
TO public 
USING (true);

-- Allow public to delete appointments (admin)
CREATE POLICY "Anyone can delete appointments" 
ON public.appointments FOR DELETE 
TO public 
USING (true);
