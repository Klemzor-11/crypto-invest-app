import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const COIN_RATES = {
  BTC: 0.08, // 8% per month
  ETH: 0.07, // 7% per month
  BNB: 0.06  // 6% per month
};

export function InvestmentCalc() {
  const [amount, setAmount] = useState<number>(10000);
  const [coin, setCoin] = useState<keyof typeof COIN_RATES>("BTC");
  const [period, setPeriod] = useState<number>(6); // months

  const result = useMemo(() => {
    const rate = COIN_RATES[coin];
    // Compound interest: A = P(1 + r/n)^(nt) where n=1 (compounded monthly), t=months
    const projectedValue = amount * Math.pow(1 + rate, period);
    const profit = projectedValue - amount;
    const roi = (profit / amount) * 100;
    
    return { projectedValue, profit, roi };
  }, [amount, coin, period]);

  return (
    <Card className="bg-card/50 backdrop-blur-md border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <CardHeader>
        <CardTitle>Investment Projector</CardTitle>
        <CardDescription>Calculate potential returns using our historical automated trading performance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 relative">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Initial Investment ($)</Label>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-32 text-right bg-background/50"
            />
          </div>
          <Slider 
            value={[amount]} 
            onValueChange={(vals) => setAmount(vals[0])} 
            max={100000} 
            min={100} 
            step={100} 
            className="[&_[role=slider]]:bg-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Asset</Label>
            <Select value={coin} onValueChange={(v) => setCoin(v as keyof typeof COIN_RATES)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Time Horizon</Label>
            <Select value={period.toString()} onValueChange={(v) => setPeriod(Number(v))}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month</SelectItem>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-background/60 border border-white/5 flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          <Label className="text-muted-foreground z-10">Projected Value</Label>
          <motion.div 
            key={result.projectedValue}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold font-mono text-white z-10 tracking-tight"
          >
            ${result.projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </motion.div>
          <div className="flex gap-4 mt-2 z-10">
            <div className="text-sm">
              <span className="text-muted-foreground">Profit: </span>
              <span className="text-green-400 font-medium">+${result.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">ROI: </span>
              <span className="text-green-400 font-medium">+{result.roi.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
