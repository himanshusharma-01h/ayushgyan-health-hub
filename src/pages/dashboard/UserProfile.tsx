import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { usePrakritiResult } from "@/hooks/usePrakritiResult";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  User, Edit, Heart, Activity, Award,
  Calendar, MessageCircle, ShoppingBag, Sparkles, LogOut, Settings
} from "lucide-react";

const UserProfile = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { result: prakriti, loading: prakritiLoading } = usePrakritiResult();

  const [editOpen, setEditOpen] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const prakritiType = prakriti?.primary_dosha || "Not assessed";
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "–";

  const activityStats = [
    { icon: MessageCircle, label: "AI Consultations", value: "23", color: "text-primary" },
    { icon: Activity, label: "Symptom Checks", value: "8", color: "text-primary" },
    { icon: ShoppingBag, label: "Orders Placed", value: "12", color: "text-primary" },
    { icon: Calendar, label: "Appointments", value: "5", color: "text-primary" },
  ];

  const healthGoals = [
    "Improve digestion",
    "Better sleep quality",
    "Reduce stress & anxiety",
    "Build daily ritual habit",
  ];

  useEffect(() => {
    if (profile?.full_name) setFullName(profile.full_name);
  }, [profile]);

  // Fetch phone from profiles table
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("phone")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data?.phone) setPhone(data.phone);
    };
    fetchProfile();
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
      // Trigger a refresh of auth context
      window.location.reload();
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
              {/* Avatar */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center flex-shrink-0 shadow-soft">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {profile?.full_name || "User"}
                </h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                  <Badge className="bg-primary/15 text-primary border-primary/20 gap-1">
                    <Sparkles className="w-3 h-3" />
                    Prakriti: {prakritiType}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="w-3 h-3" />
                    Member since {memberSince}
                  </Badge>
                </div>
              </div>

              {/* Edit Button - visible on desktop */}
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl gap-2 hidden md:flex">
                    <Edit className="w-4 h-4" /> Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Full Name</Label>
                      <Input
                        id="edit-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="rounded-xl h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        value={user?.email || ""}
                        disabled
                        className="rounded-xl h-11 bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-phone">Phone Number</Label>
                      <Input
                        id="edit-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="rounded-xl h-11"
                      />
                    </div>
                    <Button
                      onClick={handleSave}
                      className="w-full rounded-xl h-11"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Mobile Edit Button */}
          <div className="p-4 md:hidden">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full rounded-xl gap-2 h-11">
                  <Edit className="w-4 h-4" /> Edit Profile
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
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
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Prakriti Analysis
              </CardTitle>
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
                Retake Prakriti Quiz
              </Button>
            </CardContent>
          </Card>

          {/* Health Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Health Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {healthGoals.map((goal, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🎯</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{goal}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Activity Summary
              </CardTitle>
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
        </div>

        {/* Sign Out - Mobile prominent */}
        <Card className="md:hidden">
          <CardContent className="p-4">
            <Button
              variant="outline"
              className="w-full rounded-xl h-11 gap-2 text-destructive border-destructive/20 hover:bg-destructive/5"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
