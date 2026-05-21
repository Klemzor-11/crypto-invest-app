import { motion } from "framer-motion";
import { InvestmentCalc } from "@/components/calculator/InvestmentCalc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";

export default function CalculatorPage() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const [frequency, setFrequency] = useState(12); // monthly

  const compoundResult = useMemo(() => {
    // A = P(1 + r/n)^(nt)
    const r = rate / 100;
    const n = frequency;
    const t = years;
    const A = principal * Math.pow(1 + r / n, n * t);
    return {
      total: A,
      profit: A - principal
    };
  }, [principal, rate, years, frequency]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="container mx-auto px-4 py-12 space-y-12"
    >
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Financial Tools</h1>
        <p className="text-muted-foreground">Model your potential returns with our investment and compound interest calculators.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* TrustChainFX Auto-Trader Calc */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Auto-Trader Projection</h2>
            <p className="text-muted-foreground mb-6">Calculate returns based on our historical fixed-percentage algorithmic trading.</p>
            <InvestmentCalc />
          </div>
        </div>

        {/* Standard Compound Calc */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Compound Interest Calculator</h2>
            <p className="text-muted-foreground mb-6">Standard financial modeling tool for any investment with compounding yields.</p>
            <Card className="bg-card border-white/10">
              <CardHeader>
                <CardTitle>Compound Interest</CardTitle>
                <CardDescription>Model the power of compounding over time.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Principal Amount ($)</Label>
                    <Input 
                      type="number" 
                      value={principal} 
                      onChange={e => setPrincipal(Number(e.target.value))}
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Interest Rate (%)</Label>
                    <Input 
                      type="number" 
                      value={rate} 
                      onChange={e => setRate(Number(e.target.value))}
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Years to Grow</Label>
                    <Input 
                      type="number" 
                      value={years} 
                      onChange={e => setYears(Number(e.target.value))}
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Compounding Frequency</Label>
                    <Select value={frequency.toString()} onValueChange={v => setFrequency(Number(v))}>
                      <SelectTrigger className="bg-background/50 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="365">Daily</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="1">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-center space-y-2">
                  <Label className="text-primary font-medium">Future Value</Label>
                  <div className="text-4xl font-bold font-mono text-white">
                    ${compoundResult.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Total Interest Earned: <span className="text-green-400 font-medium">+${compoundResult.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}