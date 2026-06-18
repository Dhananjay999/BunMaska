-- BunMaska initial schema (merged migration)

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  skills TEXT[] DEFAULT '{}',
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view team members" ON public.team_members FOR SELECT USING (true);

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  technologies TEXT[] DEFAULT '{}',
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);

-- Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);

-- Stats
CREATE TABLE public.stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  suffix TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
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

-- FAQ items
CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faq_items TO anon, authenticated;
GRANT ALL ON public.faq_items TO service_role;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view faq items"
  ON public.faq_items
  FOR SELECT
  USING (true);

INSERT INTO public.faq_items (question, answer, display_order) VALUES
(
  'What types of projects do you take on?',
  'We build web apps, mobile apps (iOS & Android), backends, and full product engagements. From MVPs to scaling existing products — if it''s software, we can help.',
  1
),
(
  'How long does a typical project take?',
  'MVPs usually ship in 6–12 weeks. Larger products are broken into milestones with weekly demos so you see progress continuously.',
  2
),
(
  'Do you work with existing teams or solo founders?',
  'Both. We integrate with your in-house engineers or act as your entire product team — whatever fits your stage and budget.',
  3
),
(
  'What''s your pricing model?',
  'We offer fixed-scope project quotes and monthly retainer arrangements. After a discovery call, we''ll recommend the model that fits best.',
  4
),
(
  'Which technologies do you specialize in?',
  'Angular, React, Node.js, Python, Swift, Kotlin, PostgreSQL, Supabase, AWS, and modern cloud-native tooling. We pick the stack that suits your product.',
  5
),
(
  'How do we get started?',
  'Send us a message via the contact form or email. We''ll schedule a free 30-minute call to understand your goals and outline next steps.',
  6
);

-- Contact inquiries
CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_inquiries TO anon, authenticated;
GRANT SELECT ON public.contact_inquiries TO authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact inquiry"
  ON public.contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Authenticated users can view contact inquiries"
  ON public.contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);
