import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Bot, Leaf } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-glow opacity-60" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-glow opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-32 left-[15%] w-3 h-3 rounded-full bg-primary/30 animate-float" />
      <div className="absolute top-48 right-[20%] w-2 h-2 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-[25%] w-2.5 h-2.5 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-primary/10 mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-xs font-medium text-accent-foreground tracking-wide uppercase">
              AI-Powered Ayurvedic Health Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 animate-slide-up leading-[1.1] tracking-tight">
            AyushGyaan AI –{" "}
            <span className="text-gradient-emerald">Your Smart</span>
            <br />
            <span className="text-gradient-emerald">Ayurveda Assistant</span>
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.15s" }}>
            Ask AI about Ayurveda, natural remedies, and healthy living. 
            Get instant, personalized health guidance powered by advanced AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="text-base px-8 py-6 rounded-full shadow-elevated" asChild>
              <Link to="/chat">
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full" asChild>
              <Link to="#features">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Chat Preview Card */}
          <div className="mt-16 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-elevated">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">AyushGyaan AI</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              
              <div className="space-y-3 text-left">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">🧑</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-2.5">
                    <p className="text-sm text-foreground">What are the best Ayurvedic remedies for stress?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-3 h-3 text-primary" />
                  </div>
                  <div className="bg-accent/50 rounded-2xl rounded-tl-md px-4 py-2.5">
                    <p className="text-sm text-foreground">Great question! Ayurveda recommends <strong>Ashwagandha</strong> for stress relief, along with <strong>Brahmi</strong> for mental clarity and <strong>Tulsi tea</strong> for calming the nervous system...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;