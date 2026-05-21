import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SparklineChart } from "@/components/crypto/SparklineChart";
import { Search, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_MARKETS = [
  { rank: 1, symbol: "BTC", name: "Bitcoin", price: 64230.50, change24: 2.4, change7d: 5.1, cap: "1.24T", vol: "32.5B", data: [62, 63.5, 63.1, 64.2, 64.0, 64.2] },
  { rank: 2, symbol: "ETH", name: "Ethereum", price: 3450.20, change24: 1.8, change7d: -2.3, cap: "415.2B", vol: "14.2B", data: [3.3, 3.4, 3.35, 3.48, 3.42, 3.45] },
  { rank: 3, symbol: "USDT", name: "Tether", price: 1.00, change24: 0.01, change7d: 0.0, cap: "103.4B", vol: "45.1B", data: [1, 1, 1, 1, 1, 1] },
  { rank: 4, symbol: "BNB", name: "BNB", price: 590.10, change24: -0.5, change7d: 4.2, cap: "88.2B", vol: "1.8B", data: [5.8, 6.1, 5.95, 5.8, 5.92, 5.9] },
  { rank: 5, symbol: "SOL", name: "Solana", price: 145.80, change24: 5.2, change7d: 12.4, cap: "64.8B", vol: "3.2B", data: [1.3, 1.35, 1.42, 1.4, 1.48, 1.45] },
  { rank: 6, symbol: "XRP", name: "XRP", price: 0.62, change24: -1.2, change7d: -4.5, cap: "34.1B", vol: "1.2B", data: [0.65, 0.63, 0.61, 0.62, 0.6, 0.62] },
  { rank: 7, symbol: "USDC", name: "USDC", price: 1.00, change24: 0.0, change7d: 0.01, cap: "32.5B", vol: "4.5B", data: [1, 1, 1, 1, 1, 1] },
  { rank: 8, symbol: "ADA", name: "Cardano", price: 0.45, change24: 0.8, change7d: -1.2, cap: "16.2B", vol: "400M", data: [0.44, 0.46, 0.45, 0.43, 0.45, 0.45] },
  { rank: 9, symbol: "AVAX", name: "Avalanche", price: 35.20, change24: 3.4, change7d: 8.9, cap: "13.4B", vol: "600M", data: [31, 32, 34, 33, 35, 35.2] },
  { rank: 10, symbol: "DOT", name: "Polkadot", price: 7.10, change24: -2.1, change7d: 1.5, cap: "9.2B", vol: "250M", data: [7.3, 7.1, 6.9, 7.2, 7.0, 7.1] }
];

export default function MarketsPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_MARKETS.filter(m => 
    m.symbol.toLowerCase().includes(search.toLowerCase()) || 
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Cryptocurrency Markets</h1>
          <p className="text-muted-foreground">Live tracking of top assets by market capitalization.</p>
        </div>
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search coin or symbol..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-white/10"
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="w-16">#</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right hidden md:table-cell">7d Change</TableHead>
                <TableHead className="text-right hidden lg:table-cell">Market Cap</TableHead>
                <TableHead className="text-right hidden lg:table-cell">Volume (24h)</TableHead>
                <TableHead className="text-right w-32 hidden sm:table-cell">Last 7 Days</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((coin) => (
                <TableRow key={coin.symbol} className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="text-muted-foreground">{coin.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{coin.symbol}</span>
                      <span className="text-xs text-muted-foreground hidden sm:inline-block">{coin.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ${coin.price >= 10 ? coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : coin.price.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center justify-end px-2 py-1 rounded-md text-xs font-medium ${coin.change24 >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {coin.change24 >= 0 ? '+' : ''}{coin.change24}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <span className={coin.change7d >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {coin.change7d >= 0 ? '+' : ''}{coin.change7d}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell text-muted-foreground">{coin.cap}</TableCell>
                  <TableCell className="text-right hidden lg:table-cell text-muted-foreground">{coin.vol}</TableCell>
                  <TableCell className="hidden sm:table-cell py-2">
                    <div className="flex justify-end">
                      <SparklineChart data={coin.data} color={coin.change7d >= 0 ? '#10b981' : '#ef4444'} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 hover:bg-primary/20 hover:text-primary">Trade</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                    No markets found matching "{search}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
