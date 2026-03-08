ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS age integer,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS health_goals text[] DEFAULT '{}'::text[];