
CREATE TABLE public.notify_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(email)
);

ALTER TABLE public.notify_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe" ON public.notify_subscribers FOR INSERT WITH CHECK (true);
-- Admins can view all subscribers
CREATE POLICY "Admins can view subscribers" ON public.notify_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
