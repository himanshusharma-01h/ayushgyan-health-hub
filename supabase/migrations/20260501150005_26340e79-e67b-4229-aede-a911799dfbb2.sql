-- Restrict appointments table RLS
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can update appointments" ON public.appointments;
DROP POLICY IF EXISTS "Appointments are publicly viewable" ON public.appointments;

ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS user_id uuid;

CREATE POLICY "Users can view own appointments"
ON public.appointments FOR SELECT TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

CREATE POLICY "Users can create own appointments"
ON public.appointments FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments"
ON public.appointments FOR UPDATE TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role))
WITH CHECK (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

CREATE POLICY "Users can delete own appointments"
ON public.appointments FOR DELETE TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

DO $$ BEGIN
  ALTER TABLE public.appointments ADD CONSTRAINT appt_patient_name_len CHECK (length(patient_name) <= 100);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE public.appointments ADD CONSTRAINT appt_patient_email_len CHECK (length(patient_email) <= 255);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE public.appointments ADD CONSTRAINT appt_reason_len CHECK (reason IS NULL OR length(reason) <= 1000);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Restrict symptom_checks RLS
DROP POLICY IF EXISTS "Anyone can create symptom checks" ON public.symptom_checks;
DROP POLICY IF EXISTS "Anyone can update symptom checks" ON public.symptom_checks;
DROP POLICY IF EXISTS "Symptom checks are publicly viewable" ON public.symptom_checks;

ALTER TABLE public.symptom_checks ADD COLUMN IF NOT EXISTS user_id uuid;

CREATE POLICY "Users can view own symptom checks"
ON public.symptom_checks FOR SELECT TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'doctor'::app_role));

CREATE POLICY "Users can create own symptom checks"
ON public.symptom_checks FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own symptom checks"
ON public.symptom_checks FOR UPDATE TO authenticated
USING (auth.uid() = user_id AND created_at > (now() - interval '1 hour'))
WITH CHECK (auth.uid() = user_id);

DO $$ BEGIN
  ALTER TABLE public.symptom_checks ADD CONSTRAINT sc_patient_name_len CHECK (length(patient_name) <= 100);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE public.symptom_checks ADD CONSTRAINT sc_patient_email_len CHECK (length(patient_email) <= 255);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;