import { Sparkles, Heart, Globe, Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Visual */}
            <div className="relative order-2 md:order-1">
              <div className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-border shadow-card">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">AyushGyaan AI</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">AI + Ayurveda</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Heart, value: "5000+", label: "Questions Answered" },
                    { icon: Globe, value: "Hindi", label: "& English Support" },
                    { icon: Shield, value: "100%", label: "Free to Use" },
                    { icon: Sparkles, value: "24/7", label: "AI Available" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-secondary/50 rounded-xl p-3 sm:p-4 border border-border/50 hover:border-primary/10 transition-colors">
                      <stat.icon className="w-4 h-4 text-primary mb-1.5" />
                      <p className="text-lg sm:text-xl font-display font-bold text-foreground">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -inset-4 bg-glow -z-10 rounded-3xl" />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/10 mb-4">
                <span className="text-[10px] sm:text-xs font-medium text-accent-foreground uppercase tracking-wide">About Us</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
                Ancient wisdom meets{" "}
                <span className="text-gradient-emerald">modern AI</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                AyushGyaan AI is an AI-powered platform created to spread Ayurvedic knowledge 
                and wellness tips to everyone. We combine the timeless wisdom of Ayurveda with 
                cutting-edge artificial intelligence.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Our mission is to make authentic Ayurvedic health guidance accessible, 
                understandable, and actionable — whether you're exploring natural remedies, 
                understanding your body type (Prakriti), or seeking daily wellness routines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;