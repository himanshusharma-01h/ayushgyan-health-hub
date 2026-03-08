
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" ON public.notifications
  FOR DELETE USING (auth.uid() = user_id);

-- System can insert via service role; also allow insert for triggers
CREATE POLICY "Users can insert own notifications" ON public.notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-generate notification when prakriti result is saved
CREATE OR REPLACE FUNCTION public.notify_prakriti_complete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (
    NEW.user_id,
    'Prakriti Assessment Complete! 🎉',
    'Your Prakriti type is ' || NEW.primary_dosha || '. Check your dashboard for personalized insights.',
    'prakriti'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_prakriti_result_insert
  AFTER INSERT ON public.prakriti_results
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_prakriti_complete();

-- Auto-generate notification when daily rituals are submitted
CREATE OR REPLACE FUNCTION public.notify_ritual_complete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (
    NEW.user_id,
    'Daily Rituals Submitted! 🙏',
    'You completed ' || NEW.progress_percent || '% of your rituals today. Keep it up!',
    'ritual'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_ritual_log_insert
  AFTER INSERT ON public.daily_ritual_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_ritual_complete();
