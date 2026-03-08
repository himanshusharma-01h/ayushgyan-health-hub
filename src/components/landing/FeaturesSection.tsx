import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Fingerprint, Leaf, ShoppingBag, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Vaidya Chat",
    description: "Get instant Ayurvedic health guidance from our AI trained on ancient texts and modern wellness research.",
    cta: { label: "Try AI Chat", href: "/chat" },
    gradient: "from-primary/5 to-primary/10",
  },
  {
    icon: Fingerprint,
    title: "Dosha Analysis",
    description: "Discover your unique Prakriti (body constitution) with our AI-powered dosha assessment quiz.",
    cta: { label: "Take Quiz", href: "/dashboard/patient/prakriti" },
    gradient: "from-ayush-gold/5 to-ayush-gold/10",
  },
  {
    icon: Leaf,
    title: "Natural Remedies",
    description: "Explore time-tested herbal remedies, home treatments, and natural solutions for common health issues.",
    cta: { label: "Explore", href: "/chat" },
    gradient: "from-accent to-accent/50",
  },
  {
    icon: ShoppingBag,
    title: "Ayurvedic Products",
    description: "Shop authentic Ayurvedic supplements, oils, and wellness essentials from verified manufacturers.",
    cta: { label: "Shop Now", href: "/products" },
    gradient: "from-primary/5 to-accent",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/10 mb-4">
            <span className="text-[10px] sm:text-xs font-medium text-accent-foreground uppercase tracking-wide">Features</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 sm:mb-4 tracking-tight px-2">
            Everything you need for{" "}
            <span className="text-gradient-emerald">holistic wellness</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Powered by AI, rooted in Ayurveda — your complete health companion.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative bg-gradient-to-br ${feature.gradient} border border-border hover:border-primary/20 rounded-2xl p-5 sm:p-7 transition-all duration-300 hover:shadow-card hover:-translate-y-1 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-4 group-hover:border-primary/20 group-hover:shadow-soft transition-all">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>
              <Button variant="ghost" size="sm" className="px-0 text-primary hover:text-primary group-hover:translate-x-1 transition-transform" asChild>
                <Link to={feature.cta.href}>
                  {feature.cta.label}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;