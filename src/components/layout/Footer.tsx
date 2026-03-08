import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Platform: [
      { name: "AI Chat", href: "/chat" },
      { name: "Features", href: "#features" },
      { name: "About", href: "#about" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Disclaimer", href: "#disclaimer" },
    ],
    Contact: [
      { name: "📞 9672095978", href: "tel:9672095978" },
      { name: "✉️ support@ayushgyaan.ai", href: "mailto:support@ayushgyaan.ai" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-base font-display font-bold text-foreground">
                AyushGyaan AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              AI-powered Ayurvedic health guidance. Ancient wisdom meets modern technology.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-display font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> AyushGyaan AI provides informational content only and is not a substitute 
            for professional medical advice. Always consult a qualified healthcare provider for medical concerns.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AyushGyaan AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with 🌿 for holistic health
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;