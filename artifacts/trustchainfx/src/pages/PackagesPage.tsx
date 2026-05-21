import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, TrendingUp, Zap, Shield, Star, Crown, Diamond, Flame } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Package = {
  id: string;
  name: string;
  icon: React.ElementType;
  minAmount: number;
  maxAmount: number | null;
  profitPercent: number;
  duration: number;
  color: string;
  glowColor: string;
  borderColor: string;
  popular: boolean;
  features: string[];
};

const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    minAmount: 50,
    maxAmount: 499,
    profitPercent: 5,
    duration: 14,
    color: "text-sky-400",
    glowColor: "rgba(56,189,248,0.15)",
    borderColor: "border-sky-500/30",
    popular: false,
    features: [
      "5% return in 2 weeks",
      "Daily compounding",
      "Instant withdrawal",
      "Email support",
      "Basic analytics dashboard",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    icon: Shield,
    minAmount: 500,
    maxAmount: 1999,
    profitPercent: 10,
    duration: 14,
    color: "text-slate-300",
    glowColor: "rgba(203,213,225,0.12)",
    borderColor: "border-slate-400/30",
    popular: false,
    features: [
      "10% return in 2 weeks",
      "Daily compounding",
      "Priority withdrawal",
      "Email + live chat support",
      "Advanced portfolio analytics",
      "Market alerts",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    icon: Star,
    minAmount: 2000,
    maxAmount: 9999,
    profitPercent: 15,
    duration: 14,
    color: "text-yellow-400",
    glowColor: "rgba(250,204,21,0.15)",
    borderColor: "border-yellow-400/40",
    popular: true,
    features: [
      "15% return in 2 weeks",
      "Hourly compounding",
      "Same-day withdrawal",
      "Dedicated account manager",
      "Full analytics suite",
      "Priority market alerts",
      "Referral bonus program",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: TrendingUp,
    minAmount: 10000,
    maxAmount: 49999,
    profitPercent: 25,
    duration: 14,
    color: "text-cyan-400",
    glowColor: "rgba(34,211,238,0.15)",
    borderColor: "border-cyan-400/40",
    popular: false,
    features: [
      "25% return in 2 weeks",
      "Real-time compounding",
      "Instant withdrawal 24/7",
      "VIP account manager",
      "Institutional analytics",
      "Real-time alerts",
      "Exclusive investment reports",
      "Tax optimization tools",
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    icon: Diamond,
    minAmount: 50000,
    maxAmount: 249999,
    profitPercent: 35,
    duration: 14,
    color: "text-blue-400",
    glowColor: "rgba(96,165,250,0.15)",
    borderColor: "border-blue-400/40",
    popular: false,
    features: [
      "35% return in 2 weeks",
      "Continuous compounding",
      "Instant withdrawal + insurance",
      "Private relationship manager",
      "Hedge fund grade analytics",
      "Portfolio rebalancing",
      "Tax optimization suite",
      "Monthly investor reports",
      "VIP global events access",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    icon: Crown,
    minAmount: 250000,
    maxAmount: null,
    profitPercent: 50,
    duration: 14,
    color: "text-amber-400",
    glowColor: "rgba(251,191,36,0.2)",
    borderColor: "border-amber-400/50",
    popular: false,
    features: [
      "50% return in 2 weeks",
      "Continuous compounding",
      "Instant withdrawal with insurance",
      "Dedicated senior portfolio team",
      "Bespoke investment strategy",
      "Whitelist-only access",
      "Full tax advisory service",
      "Quarterly board-level reports",
      "VIP concierge support",
      "Exclusive deal flow access",
    ],
  },
];

function calc2WeekProfit(amount: number, pct: number) {
  return (amount * pct) / 100;
}

function PackageCard({ pkg }: { pkg: Package }) {
  const [amount, setAmount] = useState(pkg.minAmount);
  const profit = calc2WeekProfit(amount, pkg.profitPercent);
  const total = amount + profit;
  const { user } = useAuth();

  const maxDisplay = pkg.maxAmount ? `$${pkg.maxAmount.toLocaleString()}` : "Unlimited";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col rounded-2xl border ${pkg.borderColor} overflow-hidden`}
      style={{ background: `rgba(255,255,255,0.03)`, backdropFilter: "blur(20px)" }}
    >
      {pkg.popular && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
      )}
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3 h-3" /> Most Popular
          </span>
        </div>
      )}

      <div
        className="p-6 flex-1"
        style={{ background: `radial-gradient(ellipse at top left, ${pkg.glowColor}, transparent 60%)` }}
      >
        <div className="flex items-start justify-between mb-4 mt-2">
          <div>
            <div className={`flex items-center gap-2 mb-1`}>
              <pkg.icon className={`w-5 h-5 ${pkg.color}`} />
              <span className={`font-bold text-xl ${pkg.color}`}>{pkg.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              ${pkg.minAmount.toLocaleString()} – {maxDisplay}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-extrabold font-mono ${pkg.color}`}>{pkg.profitPercent}%</div>
            <div className="text-xs text-muted-foreground mt-1">in 14 days</div>
          </div>
        </div>

        <div className="my-5 p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs text-muted-foreground font-medium" htmlFor={`amount-${pkg.id}`}>
              Investment Amount
            </label>
            <span className="text-xs text-muted-foreground">${pkg.minAmount.toLocaleString()} – {maxDisplay}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">$</span>
            <input
              id={`amount-${pkg.id}`}
              data-testid={`input-amount-${pkg.id}`}
              type="number"
              min={pkg.minAmount}
              max={pkg.maxAmount ?? 10_000_000}
              value={amount}
              onChange={e => {
                const v = Number(e.target.value);
                setAmount(Math.max(pkg.minAmount, Math.min(pkg.maxAmount ?? 10_000_000, v)));
              }}
              className="flex-1 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-lg bg-white/5 p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">2-Week Profit</div>
              <div className="text-lg font-bold font-mono text-green-400">
                +${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="rounded-lg bg-white/5 p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">Total Return</div>
              <div className="text-lg font-bold font-mono text-white">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className={`w-4 h-4 shrink-0 ${pkg.color}`} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 pt-0">
        <Button
          data-testid={`button-invest-${pkg.id}`}
          className={`w-full h-11 font-semibold text-sm transition-all ${
            pkg.popular
              ? "bg-yellow-400 hover:bg-yellow-300 text-black"
              : "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
          }`}
          onClick={() => alert(user ? `You selected the ${pkg.name} package ($${amount.toLocaleString()}). In a live app, this would proceed to checkout.` : "Please log in to invest.")}
        >
          Invest with {pkg.name}
        </Button>
      </div>
    </motion.div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  out: { opacity: 0, y: -10 },
};

export default function PackagesPage() {
  const [filter, setFilter] = useState<"all" | "beginner" | "advanced">("all");

  const filtered = PACKAGES.filter(p => {
    if (filter === "beginner") return p.minAmount < 2000;
    if (filter === "advanced") return p.minAmount >= 2000;
    return true;
  });

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="pb-24">
      <div className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-3 py-1">
            Investment Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Choose Your Investment Package
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start with as little as <span className="text-white font-semibold">$50</span>. Every plan delivers compounded returns over a 14-day cycle — fully automated, fully transparent.
          </p>

          <div className="flex items-center justify-center gap-2 pt-4">
            {(["all", "beginner", "advanced"] as const).map(f => (
              <button
                key={f}
                data-testid={`filter-${f}`}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  filter === f
                    ? "bg-primary text-white"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                {f === "all" ? "All Plans" : f === "beginner" ? "Beginner ($50–$499)" : "Advanced ($2K+)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-16 p-6 md:p-10 rounded-2xl bg-card border border-white/5 text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Your Capital Is Protected</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            All investment packages are backed by our multi-sig cold storage vault, AES-256 encryption, and a dedicated insurance fund. Your principal is secured and returns are guaranteed by our algorithmic trading engine with a consistent 100%+ win rate over 3 years of operation.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-4 max-w-lg mx-auto">
            {[
              { label: "Capital Protection", value: "100%" },
              { label: "On-time Payouts", value: "99.98%" },
              { label: "Active Investors", value: "50K+" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold font-mono text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
