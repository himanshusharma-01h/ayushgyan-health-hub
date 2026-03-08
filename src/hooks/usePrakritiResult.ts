import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PrakritiResult {
  vata_score: number;
  pitta_score: number;
  kapha_score: number;
  primary_dosha: string;
}

export function usePrakritiResult() {
  const { user } = useAuth();
  const [result, setResult] = useState<PrakritiResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetchData = async () => {
      const { data } = await supabase
        .from("prakriti_results")
        .select("vata_score, pitta_score, kapha_score, primary_dosha")
        .eq("user_id", user.id)
        .maybeSingle();
      setResult(data);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const save = async (vata: number, pitta: number, kapha: number, primaryDosha: string) => {
    if (!user) return;
    const payload = {
      user_id: user.id,
      vata_score: vata,
      pitta_score: pitta,
      kapha_score: kapha,
      primary_dosha: primaryDosha,
    };
    // Upsert
    const { error } = await supabase
      .from("prakriti_results")
      .upsert(payload, { onConflict: "user_id" });
    if (!error) setResult(payload);
    return error;
  };

  return { result, loading, save };
}
