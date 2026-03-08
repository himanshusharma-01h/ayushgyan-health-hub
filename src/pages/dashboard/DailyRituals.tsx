import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePrakritiResult } from "@/hooks/usePrakritiResult";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Sun,
  Moon,
  Droplets,
  Wind,
  Flame,
  Leaf,
  Trophy,
  Calendar,
  CheckCircle2,
  Send,
} from "lucide-react";

interface Ritual {
  id: string;
  name: string;
  description: string;
  time: "morning" | "evening";
  icon: React.ElementType;
  completed: boolean;
}

const ritualDefinitions: Omit<Ritual, "completed">[] = [
  { id: "brahma_muhurta", name: "Brahma Muhurta Wake", description: "Wake up before sunrise (5:30 AM)", time: "morning", icon: Sun },
  { id: "tongue_scraping", name: "Tongue Scraping", description: "Clean toxins (ama) from tongue", time: "morning", icon: Droplets },
  { id: "oil_pulling", name: "Oil Pulling", description: "Swish sesame oil for 10-15 minutes", time: "morning", icon: Flame },
  { id: "pranayama", name: "Pranayama", description: "10 minutes of breathing exercises", time: "morning", icon: Wind },
  { id: "warm_water", name: "Warm Water & Herbs", description: "Drink warm water with lemon or tulsi", time: "morning", icon: Leaf },
  { id: "abhyanga", name: "Abhyanga", description: "Self-massage with warm oil", time: "evening", icon: Droplets },
  { id: "light_dinner", name: "Light Dinner", description: "Eat before 7 PM, keep it light", time: "evening", icon: Moon },
  { id: "digital_detox", name: "Digital Detox", description: "No screens 1 hour before bed", time: "evening", icon: Moon },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DailyRituals = () => {
  const { profile, user } = useAuth();
  const { result: prakriti } = usePrakritiResult();
  const [rituals, setRituals] = useState<Ritual[]>(
    ritualDefinitions.map((r) => ({ ...r, completed: false }))
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [weeklyProgress, setWeeklyProgress] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [streak, setStreak] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  // Load today's log + weekly history
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Today's log
      const { data: todayLog } = await supabase
        .from("daily_ritual_logs")
        .select("*")
        .eq("user_id", user.id)
        .eq("log_date", today)
        .maybeSingle();

      if (todayLog) {
        setSubmitted(true);
        const completedIds = todayLog.completed_rituals as string[];
        setRituals(
          ritualDefinitions.map((r) => ({
            ...r,
            completed: completedIds.includes(r.id),
          }))
        );
      }

      // Weekly progress (last 7 days)
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekDates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        return d.toISOString().split("T")[0];
      });

      const { data: weekLogs } = await supabase
        .from("daily_ritual_logs")
        .select("log_date, progress_percent")
        .eq("user_id", user.id)
        .in("log_date", weekDates);

      const progressMap: Record<string, number> = {};
      (weekLogs || []).forEach((l: any) => {
        progressMap[l.log_date] = l.progress_percent;
      });
      setWeeklyProgress(weekDates.map((d) => progressMap[d] || 0));

      // Streak calculation
      let s = 0;
      const checkDate = new Date();
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const dateStr = checkDate.toISOString().split("T")[0];
        const { data } = await supabase
          .from("daily_ritual_logs")
          .select("id")
          .eq("user_id", user.id)
          .eq("log_date", dateStr)
          .maybeSingle();
        if (data) {
          s++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
        if (s > 30) break; // cap
      }
      setStreak(s);
      setLoading(false);
    };
    load();
  }, [user, today]);

  const toggleRitual = (id: string) => {
    if (submitted) return;
    setRituals(rituals.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);
    const completedIds = rituals.filter((r) => r.completed).map((r) => r.id);
    const progress = Math.round((completedIds.length / rituals.length) * 100);

    const { error } = await supabase.from("daily_ritual_logs").upsert(
      {
        user_id: user.id,
        log_date: today,
        completed_rituals: completedIds,
        total_rituals: rituals.length,
        progress_percent: progress,
      },
      { onConflict: "user_id,log_date" }
    );

    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Rituals submitted! 🙏", description: `You completed ${progress}% today.` });
      // Update weekly progress for today
      const dayIndex = new Date().getDay();
      setWeeklyProgress((prev) => prev.map((v, i) => (i === dayIndex ? progress : v)));
      setStreak((prev) => (prev === 0 ? 1 : prev));
    }
    setSubmitting(false);
  };

  const morningRituals = rituals.filter((r) => r.time === "morning");
  const eveningRituals = rituals.filter((r) => r.time === "evening");
  const completedCount = rituals.filter((r) => r.completed).length;
  const progressPercent = Math.round((completedCount / rituals.length) * 100);

  const renderRitualList = (items: Ritual[], accentClass: string) =>
    items.map((ritual) => (
      <div
        key={ritual.id}
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
          ritual.completed
            ? `bg-primary/5 border-primary/30`
            : "bg-secondary/50 border-border hover:border-primary/30",
          submitted && "opacity-80"
        )}
      >
        <Checkbox
          checked={ritual.completed}
          onCheckedChange={() => toggleRitual(ritual.id)}
          disabled={submitted}
          className="h-6 w-6"
        />
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            ritual.completed ? "bg-primary/20" : "bg-muted"
          )}
        >
          <ritual.icon
            className={cn("w-5 h-5", ritual.completed ? "text-primary" : "text-muted-foreground")}
          />
        </div>
        <div className="flex-1">
          <p
            className={cn(
              "font-medium",
              ritual.completed ? "text-primary line-through" : "text-foreground"
            )}
          >
            {ritual.name}
          </p>
          <p className="text-sm text-muted-foreground">{ritual.description}</p>
        </div>
      </div>
    ));

  return (
    <DashboardLayout
      userName={profile?.full_name || "User"}
      userPrakriti={prakriti?.primary_dosha}
      pageTitle="Daily Rituals (Dinacharya)"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Today's Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedCount} of {rituals.length} rituals completed
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {submitted ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <Trophy
                      className={cn(
                        "w-6 h-6",
                        progressPercent === 100 ? "text-ayush-gold" : "text-muted-foreground"
                      )}
                    />
                  )}
                  <span className="text-2xl font-serif font-bold text-primary">
                    {progressPercent}%
                  </span>
                </div>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {submitted && (
                <p className="text-sm text-primary mt-3 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Submitted for today
                </p>
              )}
            </CardContent>
          </Card>

          {/* Morning Rituals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-ayush-gold" />
                Morning Rituals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderRitualList(morningRituals, "primary")}
            </CardContent>
          </Card>

          {/* Evening Rituals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-accent" />
                Evening Rituals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderRitualList(eveningRituals, "accent")}
            </CardContent>
          </Card>

          {/* Submit Button */}
          {!submitted && (
            <Button
              onClick={handleSubmit}
              disabled={submitting || completedCount === 0}
              className="w-full py-6 text-lg gap-2"
              size="lg"
            >
              <Send className="w-5 h-5" />
              {submitting ? "Submitting..." : "Submit Today's Rituals"}
            </Button>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => {
                  const isToday = index === new Date().getDay();
                  return (
                    <div
                      key={day}
                      className={cn(
                        "flex flex-col items-center p-2 rounded-lg",
                        isToday ? "bg-primary text-primary-foreground" : "bg-secondary/50"
                      )}
                    >
                      <span className="text-xs font-medium">{day}</span>
                      <span className="text-lg font-bold">{weeklyProgress[index]}%</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Streak Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ayush-gold/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-ayush-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-1">
                {streak > 0 ? `${streak} Day Streak! 🔥` : "Start your streak!"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {streak > 0
                  ? "Keep going to maintain your discipline"
                  : "Submit today's rituals to begin"}
              </p>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💡 Today's Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {prakriti?.primary_dosha
                  ? `For ${prakriti.primary_dosha} types, focus on grounding morning rituals. Warm oil massage (Abhyanga) is especially beneficial for calming your nervous system.`
                  : "Warm oil massage (Abhyanga) is beneficial for calming your nervous system. Complete your Prakriti quiz for personalized tips."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DailyRituals;
