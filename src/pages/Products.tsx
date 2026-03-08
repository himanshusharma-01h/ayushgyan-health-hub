import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sparkles, ShieldCheck, Leaf, Heart, FlaskConical,
  Bell, CheckCircle2, ArrowRight, ArrowLeft
} from "lucide-react";

const placeholderProducts = [
  { emoji: "🌿", name: "Ashwagandha Capsules", category: "Supplements" },
  { emoji: "🍯", name: "Chyawanprash Premium", category: "Supplements" },
  { emoji: "🧴", name: "Kumkumadi Face Oil", category: "Oils & Care" },
  { emoji: "💆", name: "Brahmi Hair Oil", category: "Oils & Care" },
  { emoji: "🍵", name: "Triphala Churna", category: "Supplements" },
  { emoji: "🧘", name: "Organic Yoga Mat", category: "Wellness" },
  { emoji: "🫗", name: "Copper Water Bottle", category: "Wellness" },
  { emoji: "🌰", name: "Sesame Massage Oil", category: "Oils & Care" },
];

const trustPoints = [
  { icon: ShieldCheck, text: "Verified Ayurvedic Products" },
  { icon: Heart, text: "Dosha-Based Recommendations" },
  { icon: FlaskConical, text: "Quality Checked Herbs" },
  { icon: Leaf, text: "Natural Wellness Solutions" },
];

const Products = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const { error } = await supabase.from("notify_subscribers").insert({ email: email.trim() } as any);
      if (error) {
        if (error.code === "23505") {
          toast({ title: language === "hi" ? "पहले से पंजीकृत" : "Already registered", description: language === "hi" ? "यह ईमेल पहले से सूची में है।" : "This email is already on the list." });
        } else {
          throw error;
        }
      } else {
        toast({
          title: language === "hi" ? "सूचना सेट!" : "You're on the list!",
          description: language === "hi" ? "जब उत्पाद उपलब्ध होंगे तो हम आपको सूचित करेंगे।" : "We'll notify you when products launch.",
        });
      }
      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
        </div>
        {/* Hero */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-glow opacity-40" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/10 mb-6 animate-slide-up">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-accent-foreground uppercase tracking-wider">
                  {language === "hi" ? "जल्द आ रहा है" : "Coming Soon"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
                {language === "hi" ? "आयुर्वेदिक " : "Ayurvedic "}
                <span className="text-gradient-emerald">
                  {language === "hi" ? "उत्पाद" : "Products"}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {language === "hi"
                  ? "विश्वसनीय आयुर्वेदिक उत्पाद जल्द ही यहाँ उपलब्ध होंगे। हमारी टीम आपके लिए प्रामाणिक जड़ी-बूटियाँ और वेलनेस उत्पाद सावधानीपूर्वक चुन रही है।"
                  : "Trusted Ayurvedic products will be available here soon. Our team is carefully selecting authentic herbs and wellness products for you."}
              </p>
            </div>
          </div>
        </section>

        {/* Placeholder Product Grid */}
        <section className="py-10 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {placeholderProducts.map((p, i) => (
                <Card
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border-border/60 animate-slide-up"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <CardContent className="p-0">
                    {/* Blurred image area */}
                    <div className="relative h-28 sm:h-40 bg-secondary/50 flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl opacity-30 blur-[2px] group-hover:opacity-40 transition-opacity">
                        {p.emoji}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      <Badge className="absolute top-2 right-2 bg-primary/80 text-primary-foreground text-[9px] sm:text-[10px] px-2">
                        {language === "hi" ? "जल्द" : "Soon"}
                      </Badge>
                    </div>

                    {/* Info skeleton */}
                    <div className="p-3 sm:p-4 space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-foreground/70 line-clamp-1">{p.name}</p>
                      <div className="h-2 w-3/4 rounded-full bg-muted animate-pulse" />
                      <div className="flex items-center justify-between pt-1">
                        <div className="h-2.5 w-12 rounded-full bg-muted animate-pulse" />
                        <div className="h-7 w-16 rounded-full bg-muted animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 sm:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {trustPoints.map((tp, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-3 p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <tp.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">{tp.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notify Me */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <Card className="max-w-lg mx-auto border-primary/10 shadow-card rounded-2xl overflow-hidden">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Bell className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-2">
                  {language === "hi" ? "सबसे पहले जानें" : "Be the First to Know"}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  {language === "hi"
                    ? "जब हमारे उत्पाद लॉन्च हों तो सूचना प्राप्त करें।"
                    : "Get notified when our curated Ayurvedic marketplace goes live."}
                </p>

                {submitted ? (
                  <div className="flex items-center justify-center gap-2 text-primary animate-fade-in">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {language === "hi" ? "आप सूची में हैं!" : "You're on the list!"}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleNotify} className="flex gap-2 max-w-sm mx-auto">
                    <Input
                      type="email"
                      placeholder={language === "hi" ? "आपका ईमेल" : "Your email"}
                      className="rounded-xl h-11 text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="rounded-xl h-11 px-5 shrink-0 gap-1.5">
                      <Bell className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {language === "hi" ? "सूचित करें" : "Notify Me"}
                      </span>
                      <ArrowRight className="w-4 h-4 sm:hidden" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
