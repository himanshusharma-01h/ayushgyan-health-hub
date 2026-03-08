import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Leaf } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4 sm:mb-6 tracking-tight px-2">
            Start your Ayurvedic wellness journey today
          </h2>
          
          <p className="text-sm sm:text-base text-primary-foreground/70 mb-8 sm:mb-10 max-w-lg mx-auto px-4">
            Discover your dosha, get AI-powered health guidance, and explore authentic Ayurvedic products — all for free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full w-full sm:w-auto" 
              asChild
            >
              <Link to="/chat">
                <Sparkles className="w-4 h-4 mr-2" />
                Ask AI Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto" 
              asChild
            >
              <Link to="/dashboard/patient/prakriti">
                Take Prakriti Quiz
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;