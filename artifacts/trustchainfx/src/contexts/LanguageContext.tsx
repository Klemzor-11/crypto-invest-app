import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
];

type LanguageContextType = {
  lang: string;
  setLang: (code: string) => void;
  t: (key: string) => string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.markets": "Markets",
    "nav.portfolio": "Portfolio",
    "nav.calculator": "Calculator",
    "nav.support": "Support",
    "hero.title": "Invest in the Future of Crypto",
    "hero.subtitle": "A secure, transparent, and human-driven investment platform trusted by 50,000+ investors worldwide.",
    "hero.cta.start": "Start Investing",
    "hero.cta.markets": "View Markets",
  },
  fr: {
    "nav.dashboard": "Tableau de Bord",
    "nav.markets": "Marchés",
    "nav.portfolio": "Portefeuille",
    "nav.calculator": "Calculatrice",
    "nav.support": "Support",
    "hero.title": "Investissez dans l'Avenir de la Crypto",
    "hero.subtitle": "Une plateforme d'investissement sécurisée, transparente et à dimension humaine approuvée par plus de 50 000 investisseurs dans le monde.",
    "hero.cta.start": "Commencer à Investir",
    "hero.cta.markets": "Voir les Marchés",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<string>(() => {
    return localStorage.getItem("trustchainfx_lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("trustchainfx_lang", lang);
  }, [lang]);

  const t = (key: string) => {
    const dict = translations[lang] || translations["en"];
    return dict[key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
