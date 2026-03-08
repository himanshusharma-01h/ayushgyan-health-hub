
CREATE POLICY "Users can delete own prakriti" ON public.prakriti_results
  FOR DELETE USING (auth.uid() = user_id);
