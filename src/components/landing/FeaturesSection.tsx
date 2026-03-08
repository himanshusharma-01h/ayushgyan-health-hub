import { Bot, BookOpen, Leaf, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Health Guidance",
    description: "Get instant, AI-powered health recommendations based on Ayurvedic principles and modern wellness research.",
  },
  {
    icon: BookOpen,
    title: "Ayurvedic Knowledge",
    description: "Access a vast library of Ayurvedic knowledge — from doshas and prakriti to diet plans and seasonal routines.",
  },
  {
    icon: Leaf,
    title: "Natural Remedies",
    description: "Discover time-tested herbal remedies, home treatments, and natural solutions for common health concerns.",
  },
  {
    icon: MessageCircle,
    title: "Easy AI Chat",
    description: "Simply type or speak your health question. Our AI understands context and provides clear, actionable answers.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/10 mb-4">
            <span className="text-xs font-medium text-accent-foreground uppercase tracking-wide">Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">
            Everything you need for{" "}
            <span className="text-gradient-emerald">holistic wellness</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Powered by AI, rooted in Ayurveda — your complete health companion.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card border border-border hover:border-primary/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;