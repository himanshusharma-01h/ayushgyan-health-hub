import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            <span className="text-xs font-medium text-primary-foreground/80 uppercase tracking-wide">Get Started Free</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6 tracking-tight">
            Ready to explore Ayurveda with AI?
          </h2>
          
          <p className="text-base text-primary-foreground/70 mb-10 max-w-lg mx-auto">
            Start asking health questions and discover the power of Ayurvedic wisdom — completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-base px-8 py-6 rounded-full" 
              asChild
            >
              <Link to="/chat">
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;