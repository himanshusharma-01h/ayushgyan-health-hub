import { Sparkles, Heart, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <div className="relative">
              <div className="bg-accent/30 rounded-3xl p-8 border border-border">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">AyushGyaan AI</p>
                      <p className="text-xs text-muted-foreground">AI + Ayurveda</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <Heart className="w-5 h-5 text-primary mb-2" />
                      <p className="text-2xl font-display font-bold text-foreground">5000+</p>
                      <p className="text-xs text-muted-foreground">Questions Answered</p>
                    </div>
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <Globe className="w-5 h-5 text-primary mb-2" />
                      <p className="text-2xl font-display font-bold text-foreground">Hindi</p>
                      <p className="text-xs text-muted-foreground">& English Support</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-glow -z-10 rounded-3xl" />
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/10 mb-4">
                <span className="text-xs font-medium text-accent-foreground uppercase tracking-wide">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 tracking-tight">
                Ancient wisdom meets{" "}
                <span className="text-gradient-emerald">modern AI</span>
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                AyushGyaan AI is an AI-powered platform created to spread Ayurvedic knowledge 
                and wellness tips to everyone. We combine the timeless wisdom of Ayurveda with 
                cutting-edge artificial intelligence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
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