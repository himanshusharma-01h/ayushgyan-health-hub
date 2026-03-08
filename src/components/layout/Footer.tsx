import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  const footerLinks = {
    Platform: [
      { name: "AI Vaidya Chat", href: "/chat" },
      { name: "Prakriti Quiz", href: "/dashboard/patient/prakriti" },
      { name: "Products", href: "/products" },
      { name: "Features", href: "#features" },
    ],
    Company: [
      { name: "About Us", href: "#about" },
      { name: "Blog / Ayurvedic Knowledge", href: "#" },
      { name: "Careers", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Disclaimer", href: "#disclaimer" },
    ],
    Contact: [
      { name: "📞 9672095978", href: "tel:9672095978" },
      { name: "✉️ aayushgyan.01@gmail.com", href: "mailto:aayushgyan.01@gmail.com" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <img src={logo} alt="AyushGyaan Logo" className="w-8 h-8 rounded-xl object-cover" />
              <span className="text-sm sm:text-base font-display font-bold text-foreground">
                AyushGyaan AI
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs leading-relaxed mb-4">
              AI-powered Ayurvedic health guidance. Ancient wisdom meets modern technology.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs sm:text-sm font-display font-semibold text-foreground mb-3 sm:mb-4">{title}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border">
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> AyushGyaan AI provides informational content only and is not a substitute 
            for professional medical advice. Always consult a qualified healthcare provider for medical concerns.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            © {new Date().getFullYear()} AyushGyaan – AI Powered Ayurvedic Wellness Platform
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;