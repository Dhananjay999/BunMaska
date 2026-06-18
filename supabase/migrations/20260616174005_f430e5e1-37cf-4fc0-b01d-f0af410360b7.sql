CREATE TABLE public.stats (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  value text NOT NULL,
  suffix text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stats TO authenticated;
GRANT ALL ON public.stats TO service_role;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view stats" ON public.stats FOR SELECT USING (true);

INSERT INTO public.stats (label, value, suffix, display_order) VALUES
('Projects shipped', '50', '+', 1),
('Happy clients', '30', '+', 2),
('Years combined', '8', '+', 3),
('Client retention', '100', '%', 4);