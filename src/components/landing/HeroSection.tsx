import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Bot, Leaf, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[500px] bg-glow opacity-60" />

      {/* Floating orbs */}
      <div className="absolute top-32 left-[10%] w-3 h-3 rounded-full bg-primary/30 animate-float hidden sm:block" />
      <div className="absolute top-48 right-[15%] w-2 h-2 rounded-full bg-primary/40 animate-float hidden sm:block" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-[20%] w-2.5 h-2.5 rounded-full bg-primary/20 animate-float hidden sm:block" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent border border-primary/10 mb-6 sm:mb-8 animate-fade-in">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] sm:text-xs font-medium text-accent-foreground tracking-wide uppercase">
              AI-Powered Ayurvedic Health Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground mb-4 sm:mb-6 animate-slide-up leading-[1.1] tracking-tight px-2">
            AI Powered{" "}
            <span className="text-gradient-emerald">Ayurvedic</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-gradient-emerald">Guidance</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto animate-slide-up leading-relaxed px-2" style={{ animationDelay: "0.15s" }}>
            Ask AI about Ayurveda, natural remedies, and healthy living. 
            Discover your Prakriti, get dosha analysis, and explore personalized wellness.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-elevated w-full sm:w-auto" asChild>
              <Link to="/chat">
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full border-primary/20 hover:bg-accent w-full sm:w-auto" asChild>
              <Link to="/dashboard/patient/prakriti">
                <Leaf className="w-4 h-4 mr-2" />
                Take Prakriti Test
              </Link>
            </Button>
          </div>

          {/* Chat Preview Card */}
          <div className="mt-10 sm:mt-16 animate-slide-up px-2" style={{ animationDelay: "0.5s" }}>
            <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-6 shadow-elevated">
              <div className="flex items-center gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border/50">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-foreground">AyushGyaan AI</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              
              <div className="space-y-2.5 sm:space-y-3 text-left">
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] sm:text-xs">🧑</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-md px-3 sm:px-4 py-2 sm:py-2.5">
                    <p className="text-xs sm:text-sm text-foreground">What's my dosha type and how can I balance it?</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-primary" />
                  </div>
                  <div className="bg-accent/50 rounded-2xl rounded-tl-md px-3 sm:px-4 py-2 sm:py-2.5">
                    <p className="text-xs sm:text-sm text-foreground">Based on Ayurvedic principles, your body type can be <strong>Vata</strong>, <strong>Pitta</strong>, or <strong>Kapha</strong>. Take our Prakriti quiz for a detailed analysis with personalized diet & lifestyle tips...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust stats */}
          <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto animate-slide-up" style={{ animationDelay: "0.65s" }}>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-display font-bold text-primary">10K+</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Users</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-display font-bold text-primary">50K+</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">AI Queries</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-display font-bold text-primary">4.9★</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;