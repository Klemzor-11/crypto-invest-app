import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code2, Globe2, Shield, Zap, Github, Linkedin, Mail, Terminal, Layers, Database, Cpu } from "lucide-react";

const TECH_STACK = [
  { name: "React + TypeScript", icon: Code2, desc: "Component-driven UI with full type safety" },
  { name: "Vite", icon: Zap, desc: "Lightning-fast build tooling and HMR" },
  { name: "Framer Motion", icon: Layers, desc: "Smooth, physics-based animations" },
  { name: "CoinGecko API", icon: Globe2, desc: "Real-time crypto market data" },
  { name: "Recharts", icon: Database, desc: "Interactive financial chart rendering" },
  { name: "TailwindCSS", icon: Cpu, desc: "Utility-first design system" },
];

const PLATFORM_STATS = [
  { label: "Components Built", value: "40+" },
  { label: "Pages Shipped", value: "8" },
  { label: "Lines of Code", value: "3,200+" },
  { label: "Build Time", value: "< 1s" },
];

const CHANGELOG = [
  { version: "v3.1.0", date: "May 21, 2026", notes: ["Live CoinGecko price integration", "Investment packages page (6 tiers)", "Developer profile panel"] },
  { version: "v3.0.0", date: "May 20, 2026", notes: ["Full auth system (login, signup, forgot password)", "Dashboard with animated crypto ticker", "Multi-language support (8 languages)", "Floating AI chat widget", "Markets, Portfolio, Calculator, Support pages"] },
  { version: "v2.0.0", date: "Apr 10, 2026", notes: ["Glassmorphism UI overhaul", "Responsive mobile layout", "Dark theme system"] },
  { version: "v1.0.0", date: "Jan 5, 2026", notes: ["Initial platform launch", "Core investment engine", "Basic dashboard"] },
];

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  out: { opacity: 0, y: -10 },
};

export default function DeveloperPage() {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="pb-24">
      <div className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[250px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="relative shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 border border-white/10 flex items-center justify-center text-5xl font-extrabold text-white select-none">
                AD
              </div>
              <span className="absolute -bottom-2 -right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl font-extrabold tracking-tight">Andrea Donato</h1>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Platform Developer</Badge>
                <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">Full Stack</Badge>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Architect and lead developer of TrustChainFX. Building institutional-grade fintech infrastructure with a focus on performance, security, and exceptional user experience.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="mailto:andrea@trustchainfx.com" data-testid="link-developer-email"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" /> andrea@trustchainfx.com
                </a>
                <a href="#" data-testid="link-developer-github"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href="#" data-testid="link-developer-linkedin"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLATFORM_STATS.map((s, i) => (
            <div key={i} className="p-5 rounded-xl bg-card border border-white/5 text-center">
              <div className="text-3xl font-bold font-mono text-primary mb-1">{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Technology Stack</h2>
            </div>
            <div className="space-y-3">
              {TECH_STACK.map((t, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold">Platform Changelog</h2>
            </div>
            <div className="relative pl-4 border-l border-white/10 space-y-6">
              {CHANGELOG.map((log, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-mono">{log.version}</Badge>
                      <span className="text-xs text-muted-foreground">{log.date}</span>
                    </div>
                    <ul className="space-y-1">
                      {log.notes.map((n, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1 shrink-0">›</span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-card border border-white/5 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-bold">Architecture Notes</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Frontend-Only Auth", body: "Auth state lives in localStorage, structured to be swapped for a real JWT/session backend with zero UI changes." },
              { title: "Contract-First API Design", body: "OpenAPI spec defines all endpoints. Orval generates typed React Query hooks, eliminating manual fetch code." },
              { title: "Real-Time Price Data", body: "CoinGecko public API fetches on mount + every 60s. UI jitter (±0.1%) runs every 3s for live feel between fetches." },
              { title: "Performance Budget", body: "All pages code-split via Vite. Framer Motion layout animations are GPU-accelerated using transform/opacity only." },
            ].map((note, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <div className="text-sm font-semibold text-white">{note.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{note.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
