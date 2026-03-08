import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    avatar: "👩",
    rating: 5,
    text: "AyushGyaan AI helped me understand my Vata dosha perfectly. The personalized diet tips have improved my digestion within weeks!",
  },
  {
    name: "Rahul Verma",
    location: "Jaipur",
    avatar: "👨",
    rating: 5,
    text: "The AI Vaidya is incredibly knowledgeable. It's like having an Ayurvedic doctor available 24/7. Highly recommended!",
  },
  {
    name: "Anita Desai",
    location: "Mumbai",
    avatar: "👩‍🦱",
    rating: 5,
    text: "I love the Prakriti quiz! It accurately identified my body type and gave me practical lifestyle recommendations.",
  },
  {
    name: "Vikram Singh",
    location: "Chandigarh",
    avatar: "🧔",
    rating: 5,
    text: "Finally an app that combines authentic Ayurvedic knowledge with modern AI. The remedies actually work!",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/10 mb-4">
            <span className="text-[10px] sm:text-xs font-medium text-accent-foreground uppercase tracking-wide">Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 sm:mb-4 tracking-tight">
            Trusted by <span className="text-gradient-emerald">thousands</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            See what our users say about their Ayurvedic wellness journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:shadow-card hover:border-primary/10 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-6 h-6 text-primary/20 mb-3" />
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-ayush-gold text-ayush-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;