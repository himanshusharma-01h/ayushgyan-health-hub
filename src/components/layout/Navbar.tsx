import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), href: "/" },
    { name: "Features", href: "#features" },
    { name: t('nav.consultation'), href: "/chat" },
    { name: "Products", href: "/products" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base sm:text-lg font-display font-bold text-foreground tracking-tight">
              AyushGyaan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">{t('nav.login')}</Link>
            </Button>
            <Button size="sm" className="rounded-full px-4 sm:px-5" asChild>
              <Link to="/chat">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Ask AI
              </Link>
            </Button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 sm:py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors font-medium py-2.5 px-3 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-border/50">
                <Button variant="ghost" size="sm" asChild className="justify-start rounded-xl">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</Link>
                </Button>
                <Button size="sm" className="rounded-full" asChild>
                  <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Ask AI Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;