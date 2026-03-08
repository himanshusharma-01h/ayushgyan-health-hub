import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePrakritiResult } from "@/hooks/usePrakritiResult";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  ShoppingBag,
  Calendar,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ClipboardList,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const PatientDashboard = () => {
  const { profile } = useAuth();
  const { result: prakriti, loading: prakritiLoading } = usePrakritiResult();
  const userName = profile?.full_name || "User";

  const hasPrakriti = !!prakriti;

  const doshaChartData = hasPrakriti
    ? [
        { attribute: "Vata", value: prakriti.vata_score },
        { attribute: "Pitta", value: prakriti.pitta_score },
        { attribute: "Kapha", value: prakriti.kapha_score },
      ]
    : [];

  return (
    <DashboardLayout
      userName={userName}
      userPrakriti={prakriti?.primary_dosha}
      pageTitle="Dashboard"
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
          Namaste, {userName.split(" ")[0]}! 🙏
        </h2>
        <p className="text-muted-foreground">
          {hasPrakriti
            ? `Your Prakriti type is ${prakriti.primary_dosha}. Continue your Ayurvedic wellness journey.`
            : "Complete your Prakriti assessment to unlock personalized health insights."}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Button asChild variant="outline" className="h-auto py-5 flex-col gap-2">
          <Link to="/chat">
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-sm">AI Vaidya Chat</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-5 flex-col gap-2">
          <Link to="/dashboard/patient/prakriti">
            <ClipboardList className="w-6 h-6 text-primary" />
            <span className="text-sm">{hasPrakriti ? "Retake Quiz" : "Take Prakriti Quiz"}</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-5 flex-col gap-2">
          <Link to="/dashboard/patient/appointments">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-sm">Appointments</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-5 flex-col gap-2">
          <Link to="/products">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <span className="text-sm">Shop Products</span>
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prakriti CTA or Summary */}
          {!hasPrakriti && !prakritiLoading ? (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6 text-center space-y-4">
                <Sparkles className="w-10 h-10 text-primary mx-auto" />
                <h3 className="text-lg font-serif font-semibold text-foreground">
                  Discover Your Prakriti
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Complete your Prakriti assessment to see your dosha balance, get
                  personalized rituals, and unlock tailored health insights.
                </p>
                <Button asChild>
                  <Link to="/dashboard/patient/prakriti">Start Prakriti Quiz</Link>
                </Button>
              </CardContent>
            </Card>
          ) : hasPrakriti ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Your Dosha Profile
                </CardTitle>
                <Button variant="ghost" size="sm" asChild className="gap-1">
                  <Link to="/dashboard/patient/prakriti">
                    Retake <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-blue-500/10">
                    <p className="text-2xl font-bold text-blue-500">{prakriti.vata_score}%</p>
                    <p className="text-sm text-muted-foreground">Vata</p>
                  </div>
                  <div className="p-4 rounded-xl bg-orange-500/10">
                    <p className="text-2xl font-bold text-orange-500">{prakriti.pitta_score}%</p>
                    <p className="text-sm text-muted-foreground">Pitta</p>
                  </div>
                  <div className="p-4 rounded-xl bg-green-600/10">
                    <p className="text-2xl font-bold text-green-600">{prakriti.kapha_score}%</p>
                    <p className="text-sm text-muted-foreground">Kapha</p>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Primary Dosha: <span className="font-semibold text-foreground">{prakriti.primary_dosha}</span>
                </p>
              </CardContent>
            </Card>
          ) : null}

          {/* Daily Rituals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Daily Rituals</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/patient/rituals">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Track your daily Ayurvedic routines to build healthy habits.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard/patient/rituals">Continue Rituals</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Symptoms Checker */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Symptoms Checker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Select your symptoms and get personalized Ayurvedic remedies and recommendations.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard/patient/symptoms">Check Symptoms</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Dosha Balance Chart */}
          {hasPrakriti && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Dosha Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={doshaChartData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis
                        dataKey="attribute"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm text-muted-foreground">Vata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-sm text-muted-foreground">Pitta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <span className="text-sm text-muted-foreground">Kapha</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Daily Tip */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🌿</span>
                <h4 className="font-semibold text-foreground mb-2">Daily Wellness Tip</h4>
                <p className="text-sm text-muted-foreground">
                  {hasPrakriti
                    ? `As a ${prakriti.primary_dosha} type, start your morning with warm water and honey to balance your doshas and improve digestion.`
                    : "Start your morning with warm water and honey to improve digestion and boost energy naturally."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
