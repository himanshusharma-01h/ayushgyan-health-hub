import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldCheck, Sparkles } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, isAdmin, signOut, profile } = useAuth();

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
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="AyushGyaan Logo" className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl object-cover group-hover:scale-105 transition-transform" />
            <span className="text-base sm:text-lg font-display font-bold text-foreground tracking-tight">
              AyushGyaan
            </span>
          </Link>

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

          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="outline" size="sm" asChild className="rounded-full gap-1">
                    <Link to="/admin"><ShieldCheck className="w-3.5 h-3.5" /> Admin</Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/patient">{profile?.full_name || "Dashboard"}</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button size="sm" variant="outline" className="rounded-full px-4" asChild>
                  <Link to="/login?tab=signup">Sign Up</Link>
                </Button>
                <Button size="sm" className="rounded-full px-4 sm:px-5" asChild>
                  <Link to="/chat">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Ask AI
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>

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
                {user ? (
                  <>
                    {isAdmin && (
                      <Button variant="outline" size="sm" className="justify-start rounded-xl gap-2" asChild>
                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                          <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild className="justify-start rounded-xl">
                      <Link to="/dashboard/patient" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild className="justify-start rounded-xl">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</Link>
                    </Button>
                    <Button size="sm" className="rounded-full" asChild>
                      <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                        Ask AI Now
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
