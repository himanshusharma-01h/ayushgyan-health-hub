import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, User, Stethoscope, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate(userType === "patient" ? "/dashboard/patient" : "/dashboard/doctor");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[100svh] bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-glow opacity-50" />

      <div className="w-full max-w-sm sm:max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-primary flex items-center justify-center">
            <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-primary-foreground" />
          </div>
          <span className="text-xl sm:text-2xl font-display font-bold text-foreground">
            AyushGyaan AI
          </span>
        </Link>

        <Card className="shadow-elevated border-border rounded-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl sm:text-2xl font-display">Welcome Back</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Sign in to continue your wellness journey
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* User Type Toggle */}
            <Tabs value={userType} onValueChange={(v) => setUserType(v as "patient" | "doctor")} className="mb-5 sm:mb-6">
              <TabsList className="grid w-full grid-cols-2 rounded-xl h-10">
                <TabsTrigger value="patient" className="flex items-center gap-2 rounded-lg text-xs sm:text-sm">
                  <User className="w-3.5 h-3.5" />
                  Patient
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-2 rounded-lg text-xs sm:text-sm">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Doctor
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" type="email" placeholder="you@example.com" 
                    className="pl-10 rounded-xl h-10 sm:h-11 text-sm"
                    defaultValue={userType === "patient" ? "patient@demo.com" : "doctor@demo.com"}
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="password" className="text-xs sm:text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" 
                    className="pl-10 pr-10 rounded-xl h-10 sm:h-11 text-sm"
                    defaultValue="demo123"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs sm:text-sm">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-xs sm:text-sm text-primary hover:underline">Forgot password?</a>
              </div>

              <Button type="submit" className="w-full rounded-xl h-10 sm:h-11 text-sm" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  `Sign in as ${userType === "patient" ? "Patient" : "Doctor"}`
                )}
              </Button>
            </form>

            <div className="mt-5 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline font-medium">Sign up</a>
              </p>
            </div>

            <div className="mt-4 sm:mt-6 p-3 bg-accent/50 rounded-xl">
              <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
                🎭 <strong>Demo Mode:</strong> Click "Sign in" with any credentials to explore
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;