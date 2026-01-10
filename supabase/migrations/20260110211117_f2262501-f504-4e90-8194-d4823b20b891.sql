-- Create stock_entries table for storing inventory records
CREATE TABLE public.stock_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  necklaces INTEGER NOT NULL DEFAULT 0,
  bracelets INTEGER NOT NULL DEFAULT 0,
  earrings INTEGER NOT NULL DEFAULT 0,
  rings INTEGER NOT NULL DEFAULT 0,
  bangles INTEGER NOT NULL DEFAULT 0,
  empty_dummies INTEGER NOT NULL DEFAULT 0,
  free_earrings_spaces INTEGER NOT NULL DEFAULT 0,
  sets_with_necklaces INTEGER NOT NULL DEFAULT 0,
  sets_with_bracelets INTEGER NOT NULL DEFAULT 0,
  sets_rings_and_earrings INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for now - no auth required)
ALTER TABLE public.stock_entries ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" 
ON public.stock_entries 
FOR SELECT 
USING (true);

-- Create policy for public insert access
CREATE POLICY "Allow public insert access" 
ON public.stock_entries 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public update access
CREATE POLICY "Allow public update access" 
ON public.stock_entries 
FOR UPDATE 
USING (true);

-- Create policy for public delete access
CREATE POLICY "Allow public delete access" 
ON public.stock_entries 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stock_entries_updated_at
BEFORE UPDATE ON public.stock_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on date for faster lookups
CREATE INDEX idx_stock_entries_date ON public.stock_entries(date DESC);