import { useState, useEffect, useCallback } from "react";
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
      const { data, error } = await supabase
        .from("prakriti_results")
        .select("vata_score, pitta_score, kapha_score, primary_dosha")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) console.error("Prakriti fetch error:", error);
      setResult(data);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const save = useCallback(async (vata: number, pitta: number, kapha: number, primaryDosha: string) => {
    // Get fresh session to ensure we have the right user
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) {
      console.error("Prakriti save: No authenticated user");
      return { message: "Not authenticated" };
    }

    const payload = {
      user_id: userId,
      vata_score: vata,
      pitta_score: pitta,
      kapha_score: kapha,
      primary_dosha: primaryDosha,
    };

    console.log("Saving prakriti:", payload);

    // Try delete + insert instead of upsert for reliability
    await supabase.from("prakriti_results").delete().eq("user_id", userId);
    
    const { error } = await supabase
      .from("prakriti_results")
      .insert(payload);

    console.log("Prakriti save result:", error ? error : "success");

    if (!error) {
      setResult({ vata_score: vata, pitta_score: pitta, kapha_score: kapha, primary_dosha: primaryDosha });
    }
    return error;
  }, []);

  return { result, loading, save };
}
