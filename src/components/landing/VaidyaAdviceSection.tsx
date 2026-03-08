import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Stethoscope } from "lucide-react";

interface Advice {
  id: string;
  title: string;
  title_hi: string | null;
  description: string;
  description_hi: string | null;
  category: string;
  doctor_name: string;
  created_at: string;
}

const categoryEmojis: Record<string, string> = {
  general: "🌿", digestion: "🍵", immunity: "🛡️", stress: "🧘",
  sleep: "😴", skin: "✨", detox: "💧", energy: "⚡",
};

const VaidyaAdviceSection = () => {
  const { language } = useLanguage();
  const [advice, setAdvice] = useState<Advice[]>([]);
  const [selected, setSelected] = useState<Advice | null>(null);

  const fetchAdvice = async () => {
    const { data } = await supabase
      .from("vaidya_advice")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    setAdvice(data || []);
  };

  useEffect(() => { fetchAdvice(); }, []);

  useEffect(() => {
    const channel = supabase
      .channel("advice-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "vaidya_advice" }, () => fetchAdvice())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  if (advice.length === 0) return null;

  const getTitle = (a: Advice) => (language === "hi" && a.title_hi) ? a.title_hi : a.title;
  const getDesc = (a: Advice) => (language === "hi" && a.description_hi) ? a.description_hi : a.description;

  return (
    <section className="py-16 sm:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/10 mb-4">
            <Stethoscope className="w-3 h-3 text-primary" />
            <span className="text-[10px] sm:text-xs font-medium text-accent-foreground uppercase tracking-wide">
              {language === "hi" ? "वैद्य सलाह" : "Vaidya Advice"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            {language === "hi" ? "ताज़ा आयुर्वेदिक मार्गदर्शन" : "Latest Ayurvedic Guidance"}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {advice.map((a, i) => (
            <Card
              key={a.id}
              className="cursor-pointer hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSelected(a)}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{categoryEmojis[a.category] || "🌿"}</span>
                  <Badge variant="secondary" className="text-[10px]">{a.category}</Badge>
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">{getTitle(a)}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{getDesc(a)}</p>
                <p className="text-[10px] text-muted-foreground">
                  {language === "hi" ? "डॉ." : "Dr."} {a.doctor_name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">{getTitle(selected)}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <Badge variant="secondary">{selected.category}</Badge>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {getDesc(selected)}
                </p>
                <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                  {language === "hi" ? "डॉ." : "Dr."} {selected.doctor_name} · {new Date(selected.created_at).toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VaidyaAdviceSection;
