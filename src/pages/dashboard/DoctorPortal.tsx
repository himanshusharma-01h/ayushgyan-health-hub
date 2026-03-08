import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { usePrakritiResult } from "@/hooks/usePrakritiResult";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Stethoscope, ShieldCheck, Video, Heart, UserCheck,
  Bell, CheckCircle, Clock, Star
} from "lucide-react";

const placeholderDoctors = [
  { name: "Ayurvedic Physician", specialty: "General Wellness", emoji: "👨‍⚕️" },
  { name: "Panchakarma Expert", specialty: "Detox & Rejuvenation", emoji: "🧘" },
  { name: "Vaidya Specialist", specialty: "Chronic Conditions", emoji: "👩‍⚕️" },
  { name: "Yoga Therapist", specialty: "Mind-Body Balance", emoji: "🙏" },
  { name: "Herbal Medicine Expert", specialty: "Natural Remedies", emoji: "🌿" },
  { name: "Diet & Nutrition", specialty: "Dosha-Based Diets", emoji: "🍽️" },
];

const trustPoints = [
  { icon: UserCheck, text: "Verified Ayurvedic Vaidyas", description: "All practitioners are certified and verified" },
  { icon: ShieldCheck, text: "Secure Online Consultations", description: "End-to-end encrypted video calls" },
  { icon: Heart, text: "Personalized Health Guidance", description: "Advice tailored to your Prakriti" },
  { icon: Video, text: "Video Consultation Support", description: "Face-to-face consultations from home" },
];

const DoctorPortal = () => {
  const { profile } = useAuth();
  const { result: prakriti } = usePrakritiResult();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const { error } = await supabase
      .from("notify_subscribers")
      .insert({ email: email.trim() });

    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already registered!", description: "You're already on the notification list." });
        setSubmitted(true);
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
      return;
    }

    toast({ title: "You're on the list! 🎉", description: "We'll notify you when doctors are available." });
    setSubmitted(true);
    setEmail("");
  };

  return (
    <DashboardLayout
      userName={profile?.full_name || "User"}
      userPrakriti={prakriti?.primary_dosha}
      pageTitle="Doctor Portal"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Clock className="w-4 h-4" />
            Coming Soon
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground">
            Consult Verified Ayurvedic Doctors
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Verified Ayurvedic doctors will be available here soon. Our team is onboarding 
            experienced Vaidyas to provide trusted consultations.
          </p>
        </div>

        {/* Trust Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {trustPoints.map((point) => (
            <Card key={point.text} className="text-center">
              <CardContent className="pt-5 pb-4 px-3">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <point.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-foreground mb-1">{point.text}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder Doctor Cards */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
            Upcoming Practitioners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {placeholderDoctors.map((doc, i) => (
              <Card key={i} className="overflow-hidden group">
                <CardContent className="p-4 md:p-5">
                  <div className="flex flex-col items-center text-center">
                    {/* Blurred avatar placeholder */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 blur-[2px] group-hover:blur-[1px] transition-all">
                      <span className="text-2xl md:text-3xl">{doc.emoji}</span>
                    </div>
                    {/* Skeleton name */}
                    <div className="w-24 h-3 bg-muted rounded-full mb-2 animate-pulse" />
                    <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 text-muted fill-muted" />
                      ))}
                    </div>
                    <Badge variant="secondary" className="mt-3 text-[10px]">
                      Coming Soon
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notify Section */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/15 flex items-center justify-center">
              <Bell className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-2">
              Get Notified When Doctors Are Available
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
              Be the first to book a consultation with our verified Ayurvedic Vaidyas.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">You're on the list! We'll notify you soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl h-11 flex-1"
                />
                <Button type="submit" className="rounded-xl h-11 px-6 gap-2">
                  <Bell className="w-4 h-4" />
                  Notify Me
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorPortal;
