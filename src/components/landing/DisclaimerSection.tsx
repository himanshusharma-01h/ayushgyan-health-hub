import { AlertTriangle } from "lucide-react";

const DisclaimerSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-ayush-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-ayush-gold" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  Medical Disclaimer
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  AyushGyaan AI provides <strong className="text-foreground">informational content only</strong> and 
                  is <strong className="text-foreground">not a substitute</strong> for professional medical advice, 
                  diagnosis, or treatment. Always seek the advice of a qualified healthcare provider 
                  with any questions regarding a medical condition.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Ayurvedic knowledge shared here is for educational purposes. Never disregard 
                  professional medical advice or delay seeking treatment because of something you 
                  read or received from this AI assistant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerSection;