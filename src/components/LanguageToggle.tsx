import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-xs sm:text-sm font-medium h-8 px-2 sm:px-3 rounded-full hover:bg-accent"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{language === 'en' ? 'हिंदी' : 'ENG'}</span>
    </Button>
  );
};

export default LanguageToggle;