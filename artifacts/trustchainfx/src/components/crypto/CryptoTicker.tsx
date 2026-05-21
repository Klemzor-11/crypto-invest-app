import { useState, useEffect } from "react";
import { SparklineChart } from "./SparklineChart";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_DATA = [
  { symbol: "BTC", name: "Bitcoin", price: 64230.50, change: 2.4, cap: "1.2T", baseData: [62000, 63500, 63100, 64200, 64000, 64230] },
  { symbol: "ETH", name: "Ethereum", price: 3450.20, change: 1.8, cap: "410B", baseData: [3300, 3400, 3350, 3480, 3420, 3450] },
  { symbol: "BNB", name: "BNB", price: 590.10, change: -0.5, cap: "90B", baseData: [600, 610, 595, 580, 592, 590] },
  { symbol: "SOL", name: "Solana", price: 145.80, change: 5.2, cap: "65B", baseData: [130, 135, 142, 140, 148, 145] },
  { symbol: "ADA", name: "Cardano", price: 0.45, change: -1.2, cap: "16B", baseData: [0.47, 0.48, 0.46, 0.44, 0.45, 0.45] }
];

export function CryptoTicker() {
  const [coins, setCoins] = useState(INITIAL_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => prevCoins.map(coin => {
        // Random price fluctuation +/- 0.5%
        const variation = coin.price * (Math.random() * 0.01 - 0.005);
        const newPrice = coin.price + variation;
        
        // Update change slightly
        const newChange = coin.change + (Math.random() * 0.4 - 0.2);
        
        // Update history
        const newHistory = [...coin.baseData.slice(1), newPrice];

        return {
          ...coin,
          price: newPrice,
          change: newChange,
          baseData: newHistory
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide hide-scrollbar">
      {coins.map((coin) => {
        const isPositive = coin.change >= 0;
        const color = isPositive ? "#10b981" : "#ef4444";
        
        return (
          <div key={coin.symbol} className="min-w-[280px] p-4 rounded-xl bg-card border border-white/5 shadow-lg backdrop-blur-sm flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{coin.symbol}</span>
                <span className="text-xs text-muted-foreground">{coin.name}</span>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={coin.price}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-mono font-semibold mt-1"
                >
                  ${coin.price >= 10 ? coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : coin.price.toFixed(4)}
                </motion.div>
              </AnimatePresence>
              <div className={`text-xs font-medium mt-1 flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{coin.change.toFixed(2)}%
                <span className="text-muted-foreground font-normal ml-2">Cap: {coin.cap}</span>
              </div>
            </div>
            <div className="ml-4">
              <SparklineChart data={coin.baseData} color={color} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
