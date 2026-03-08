import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { usePrakritiResult } from "@/hooks/usePrakritiResult";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  User, Edit, Heart, Activity, Award,
  Calendar, MessageCircle, ShoppingBag, Sparkles, LogOut, Scale, Plus, TrendingDown, TrendingUp, Minus
} from "lucide-react";

const UserProfile = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { result: prakriti } = usePrakritiResult();

  const [editOpen, setEditOpen] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [healthGoals, setHealthGoals] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Activity counts
  const [activityCounts, setActivityCounts] = useState({ symptomChecks: 0, orders: 0, appointments: 0, ritualDays: 0 });

  // Weight tracking
  const [weightLogs, setWeightLogs] = useState<{ weight_kg: number; logged_at: string }[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [addingWeight, setAddingWeight] = useState(false);
  const [weightDialogOpen, setWeightDialogOpen] = useState(false);

  const prakritiType = prakriti?.primary_dosha || "Not assessed";
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "–";

  const healthGoals = [
    "Improve digestion",
    "Better sleep quality",
    "Reduce stress & anxiety",
    "Build daily ritual habit",
  ];

  useEffect(() => {
    if (profile?.full_name) setFullName(profile.full_name);
  }, [profile]);

  // Fetch phone, activity counts, weight logs
  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      // Phone
      const { data: profileData } = await supabase
        .from("profiles")
        .select("phone")
        .eq("user_id", user.id)
        .maybeSingle();
      if (profileData?.phone) setPhone(profileData.phone);

      // Activity counts
      const [symptomRes, ordersRes, appointmentsRes, ritualsRes] = await Promise.all([
        supabase.from("symptom_checks").select("id", { count: "exact", head: true }).eq("patient_email", user.email || ""),
        supabase.from("orders").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("patient_email", user.email || ""),
        supabase.from("daily_ritual_logs").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setActivityCounts({
        symptomChecks: symptomRes.count || 0,
        orders: ordersRes.count || 0,
        appointments: appointmentsRes.count || 0,
        ritualDays: ritualsRes.count || 0,
      });

      // Weight logs (last 10)
      const { data: wLogs } = await supabase
        .from("weight_logs")
        .select("weight_kg, logged_at")
        .eq("user_id", user.id)
        .order("logged_at", { ascending: false })
        .limit(10);
      if (wLogs) setWeightLogs(wLogs as any);
    };
    fetchAll();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!", description: "Your details have been saved." });
      setEditOpen(false);
      window.location.reload();
    }
    setSaving(false);
  };

  const handleAddWeight = async () => {
    if (!user || !newWeight) return;
    const weightNum = parseFloat(newWeight);
    if (isNaN(weightNum) || weightNum < 20 || weightNum > 300) {
      toast({ title: "Invalid weight", description: "Enter a weight between 20-300 kg", variant: "destructive" });
      return;
    }
    setAddingWeight(true);
    const today = new Date().toISOString().split("T")[0];
    
    await supabase.from("weight_logs").delete().eq("user_id", user.id).eq("logged_at", today);
    const { error } = await supabase.from("weight_logs").insert({
      user_id: user.id,
      weight_kg: weightNum,
      logged_at: today,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Weight logged!", description: `${weightNum} kg recorded for today.` });
      setWeightLogs((prev) => [{ weight_kg: weightNum, logged_at: today }, ...prev.filter(l => l.logged_at !== today)]);
      setNewWeight("");
      setWeightDialogOpen(false);
    }
    setAddingWeight(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const latestWeight = weightLogs[0]?.weight_kg;
  const previousWeight = weightLogs[1]?.weight_kg;
  const weightChange = latestWeight && previousWeight ? latestWeight - previousWeight : null;

  const activityStats = [
    { icon: Activity, label: "Symptom Checks", value: String(activityCounts.symptomChecks), color: "text-primary" },
    { icon: ShoppingBag, label: "Orders Placed", value: String(activityCounts.orders), color: "text-primary" },
    { icon: Calendar, label: "Appointments", value: String(activityCounts.appointments), color: "text-primary" },
    { icon: MessageCircle, label: "Ritual Days", value: String(activityCounts.ritualDays), color: "text-primary" },
  ];

  return (
    <DashboardLayout
      userName={profile?.full_name || "User"}
      userPrakriti={prakritiType}
      pageTitle="My Profile"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/15 via-primary/10 to-accent/10 p-6 md:p-8">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-5 md:gap-6">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center flex-shrink-0 shadow-soft">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{profile?.full_name || "User"}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                  <Badge className="bg-primary/15 text-primary border-primary/20 gap-1">
                    <Sparkles className="w-3 h-3" /> Prakriti: {prakritiType}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="w-3 h-3" /> Member since {memberSince}
                  </Badge>
                  {latestWeight && (
                    <Badge variant="secondary" className="gap-1">
                      <Scale className="w-3 h-3" /> {latestWeight} kg
                    </Badge>
                  )}
                </div>
              </div>
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl gap-2 hidden md:flex">
                    <Edit className="w-4 h-4" /> Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader><DialogTitle>Edit Profile</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Full Name</Label>
                      <Input id="edit-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-email">Email</Label>
                      <Input id="edit-email" value={user?.email || ""} disabled className="rounded-xl h-11 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-phone">Phone Number</Label>
                      <Input id="edit-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" className="rounded-xl h-11" />
                    </div>
                    <Button onClick={handleSave} className="w-full rounded-xl h-11" disabled={saving}>
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="p-4 md:hidden">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full rounded-xl gap-2 h-11"><Edit className="w-4 h-4" /> Edit Profile</Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium text-foreground">{profile?.full_name || "–"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium text-foreground truncate ml-4">{user?.email || "–"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="text-sm font-medium text-foreground">{phone || "Not set"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium text-foreground">{memberSince}</span>
              </div>
            </CardContent>
          </Card>

          {/* Prakriti Result */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Award className="w-5 h-5 text-primary" /> Prakriti Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/15 flex items-center justify-center">
                  <Sparkles className="w-9 h-9 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-1">{prakritiType}</h3>
                <p className="text-sm text-muted-foreground mb-4">Your dominant Dosha constitution</p>
                {prakriti ? (
                  <div className="flex justify-center gap-3">
                    <div className="text-center px-4 py-2 rounded-xl bg-blue-500/10">
                      <p className="text-lg font-bold text-blue-600">{prakriti.vata_score}%</p>
                      <p className="text-xs text-muted-foreground">Vata</p>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-orange-500/10">
                      <p className="text-lg font-bold text-orange-600">{prakriti.pitta_score}%</p>
                      <p className="text-xs text-muted-foreground">Pitta</p>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-green-500/10">
                      <p className="text-lg font-bold text-green-600">{prakriti.kapha_score}%</p>
                      <p className="text-xs text-muted-foreground">Kapha</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Take the Prakriti quiz to see your results</p>
                )}
              </div>
              <Button variant="outline" className="w-full rounded-xl mt-2" onClick={() => navigate("/dashboard/patient/prakriti")}>
                {prakriti ? "Retake Prakriti Quiz" : "Take Prakriti Quiz"}
              </Button>
            </CardContent>
          </Card>

          {/* Weight Tracking */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2"><Scale className="w-5 h-5 text-primary" /> Weight Tracker</CardTitle>
              <Dialog open={weightDialogOpen} onOpenChange={setWeightDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 rounded-xl"><Plus className="w-4 h-4" /> Log</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader><DialogTitle>Log Today's Weight</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="weight-input">Weight (kg)</Label>
                      <Input id="weight-input" type="number" step="0.1" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} placeholder="e.g. 68.5" className="rounded-xl h-11" />
                    </div>
                    <Button onClick={handleAddWeight} disabled={addingWeight} className="w-full rounded-xl h-11">
                      {addingWeight ? "Saving..." : "Save Weight"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {latestWeight ? (
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <p className="text-3xl font-serif font-bold text-foreground">{latestWeight} kg</p>
                    <p className="text-xs text-muted-foreground mt-1">Latest: {weightLogs[0]?.logged_at}</p>
                    {weightChange !== null && (
                      <div className={`flex items-center justify-center gap-1 mt-2 text-sm font-medium ${weightChange > 0 ? "text-orange-500" : weightChange < 0 ? "text-primary" : "text-muted-foreground"}`}>
                        {weightChange > 0 ? <TrendingUp className="w-4 h-4" /> : weightChange < 0 ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                        {weightChange > 0 ? "+" : ""}{weightChange.toFixed(1)} kg
                      </div>
                    )}
                  </div>
                  {weightLogs.length > 1 && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-medium">Recent History</p>
                      {weightLogs.slice(0, 5).map((log, i) => (
                        <div key={i} className="flex justify-between items-center text-sm py-1.5 border-b border-border last:border-0">
                          <span className="text-muted-foreground">{log.logged_at}</span>
                          <span className="font-medium text-foreground">{log.weight_kg} kg</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Scale className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">No weight logged yet. Start tracking!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {activityStats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-secondary/50">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-serif font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Goals */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Heart className="w-5 h-5 text-primary" /> Health Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {healthGoals.map((goal, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🎯</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{goal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sign Out - Mobile */}
        <Card className="md:hidden">
          <CardContent className="p-4">
            <Button variant="outline" className="w-full rounded-xl h-11 gap-2 text-destructive border-destructive/20 hover:bg-destructive/5" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
