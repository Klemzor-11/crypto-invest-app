import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CryptoTicker } from "@/components/crypto/CryptoTicker";
import { InvestmentCalc } from "@/components/calculator/InvestmentCalc";
import { Shield, Eye, Globe2, Headphones, Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Michael R.", country: "United Kingdom", image: "https://randomuser.me/api/portraits/men/32.jpg", quote: "The most transparent crypto platform I've used. Returns are consistent and withdrawals are instant." },
  { name: "Sarah J.", country: "United States", image: "https://randomuser.me/api/portraits/women/44.jpg", quote: "TrustChainFX completely changed my approach to passive crypto investing. The dashboard is a masterpiece." },
  { name: "David K.", country: "Germany", image: "https://randomuser.me/api/portraits/men/76.jpg", quote: "Institutional grade security with retail accessibility. I trust them with a significant portion of my portfolio." },
  { name: "Elena M.", country: "Spain", image: "https://randomuser.me/api/portraits/women/28.jpg", quote: "Their 24/7 support is actually 24/7. Solved my integration issue in under 5 minutes on a Sunday." },
  { name: "James L.", country: "Canada", image: "https://randomuser.me/api/portraits/men/55.jpg", quote: "The automated compounding feature alone makes this platform worth it. Beautiful UI too." },
  { name: "Yuki T.", country: "Japan", image: "https://randomuser.me/api/portraits/women/61.jpg", quote: "Reliable, fast, and extremely secure. Exactly what you need in today's crypto market." }
];

const FEATURES = [
  { icon: Shield, title: "Bank-Grade Security", desc: "Multi-sig cold storage, AES-256 encryption, and rigorous continuous audits protect your assets." },
  { icon: Eye, title: "Total Transparency", desc: "Real-time proof of reserves. See exactly where your funds are allocated at any given moment." },
  { icon: Globe2, title: "Global Reach", desc: "Operating seamlessly across 120+ countries with localized support and seamless fiat ramps." },
  { icon: Headphones, title: "24/7 Priority Support", desc: "Human experts available around the clock. No bots, no endless ticket queues." }
];

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.1 } },
  out: { opacity: 0, y: -10 }
};

const childVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-[20%] left-[50%] translate-x-[-50%] w-[80%] h-[50%] bg-primary/20 blur-[150px] rounded-[100%] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={childVariants} className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Platform v3.0 is now live
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground md:px-12 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 h-14 bg-primary hover:bg-primary/90 text-white shadow-[0_0_40px_-10px_var(--primary)]">
                {t("hero.cta.start")}
              </Button>
              <Link href="/markets">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-14 border-white/20 hover:bg-white/5">
                  {t("hero.cta.markets")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section variants={childVariants} className="border-y border-white/10 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {[
              { label: "Total Users", value: "50,000+" },
              { label: "Assets Managed", value: "$2.4B+" },
              { label: "Countries Supported", value: "120+" },
              { label: "System Uptime", value: "99.99%" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Live Ticker */}
      <motion.section variants={childVariants} className="py-12 border-b border-white/10 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Market Updates
          </h2>
          <CryptoTicker />
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-24 space-y-32">
        {/* Calculator Section */}
        <motion.section variants={childVariants} className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Predictable returns in a volatile market.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our algorithmic trading engine exploits micro-inefficiencies across dozens of global exchanges, providing steady, compounded returns regardless of broader market direction.
            </p>
            <ul className="space-y-4 pt-4">
              {['Automated daily compounding', 'Zero performance fees', 'Instant withdrawals', 'Real-time audit trails'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Shield className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <InvestmentCalc />
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section variants={childVariants}>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Institutional Infrastructure</h2>
            <p className="text-muted-foreground text-lg">Built from the ground up to meet the exacting standards of professional fund managers.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section variants={childVariants}>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Trusted by Real Investors Worldwide</h2>
            <p className="text-muted-foreground text-lg">Don't just take our word for it. Hear from the professionals who rely on TrustChainFX daily.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-white/5 flex flex-col justify-between">
                <div className="space-y-4 mb-6">
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full border border-white/10" />
                  <div>
                    <div className="font-bold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
