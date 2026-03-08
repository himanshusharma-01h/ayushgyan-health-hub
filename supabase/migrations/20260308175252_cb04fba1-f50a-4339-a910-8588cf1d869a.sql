
CREATE TABLE public.daily_ritual_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date date NOT NULL DEFAULT CURRENT_DATE,
  completed_rituals text[] NOT NULL DEFAULT '{}',
  total_rituals integer NOT NULL DEFAULT 8,
  progress_percent integer NOT NULL DEFAULT 0,
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, log_date)
);

ALTER TABLE public.daily_ritual_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ritual logs" ON public.daily_ritual_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ritual logs" ON public.daily_ritual_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ritual logs" ON public.daily_ritual_logs
  FOR UPDATE USING (auth.uid() = user_id);
