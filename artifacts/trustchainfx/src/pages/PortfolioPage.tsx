import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, TrendingUp, TrendingDown, Activity } from "lucide-react";

const HOLDINGS = [
  { symbol: "BTC", name: "Bitcoin", amount: 1.25, avgPrice: 42000, currentPrice: 64230.50, color: "#f7931a" },
  { symbol: "ETH", name: "Ethereum", amount: 15.4, avgPrice: 2100, currentPrice: 3450.20, color: "#627eea" },
  { symbol: "BNB", name: "Binance Coin", amount: 45.0, avgPrice: 320, currentPrice: 590.10, color: "#f3ba2f" }
];

export default function PortfolioPage() {
  const data = HOLDINGS.map(h => {
    const value = h.amount * h.currentPrice;
    const invested = h.amount * h.avgPrice;
    const profit = value - invested;
    const profitPercent = (profit / invested) * 100;
    return { ...h, value, invested, profit, profitPercent };
  });

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  const totalInvested = data.reduce((acc, curr) => acc + curr.invested, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPercent = (totalProfit / totalInvested) * 100;

  const chartData = data.map(d => ({ name: d.symbol, value: d.value, color: d.color }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="container mx-auto px-4 py-12 space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Portfolio Overview</h1>
        <p className="text-muted-foreground">Manage and track your active investments.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Balance</span>
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Wallet className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Profit/Loss</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${totalProfit >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {totalProfit >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </div>
            </div>
            <div className={`text-3xl font-bold font-mono ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalProfit >= 0 ? '+' : '-'}${Math.abs(totalProfit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Return (ROI)</span>
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Activity className="h-4 w-4" />
              </div>
            </div>
            <div className={`text-3xl font-bold font-mono ${totalProfitPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalProfitPercent >= 0 ? '+' : ''}{totalProfitPercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Top Performer</span>
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                <Star className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono text-white">BTC</div>
            <div className="text-sm text-green-500 font-medium mt-1">+52.9%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Allocation Chart */}
        <Card className="bg-card border-white/10 lg:col-span-1">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-4">
              {chartData.map(d => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="font-medium">{d.name}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {((d.value / totalValue) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Holdings Table */}
        <Card className="bg-card border-white/10 lg:col-span-2 overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle>Your Assets</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto flex-1">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-white/10">
                  <TableHead>Asset</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Avg. Buy Price</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">P&L</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.symbol} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="font-bold">{row.symbol}</div>
                      <div className="text-xs text-muted-foreground">{row.name}</div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{row.amount}</TableCell>
                    <TableCell className="text-right text-muted-foreground">${row.avgPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono">${row.currentPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">${row.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className="text-right">
                      <div className={`font-medium ${row.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {row.profit >= 0 ? '+' : '-'}${Math.abs(row.profit).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className={`text-xs ${row.profitPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {row.profitPercent >= 0 ? '+' : ''}{row.profitPercent.toFixed(2)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

function Star(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}