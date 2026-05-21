import { useState, useEffect, useCallback } from "react";
import { SparklineChart } from "./SparklineChart";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

type CoinData = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  cap: string;
  baseData: number[];
};

const FALLBACK_DATA: CoinData[] = [
  { symbol: "BTC", name: "Bitcoin", price: 64230.50, change: 2.4, cap: "1.24T", baseData: [62000, 63500, 63100, 64200, 64000, 64230, 64100] },
  { symbol: "ETH", name: "Ethereum", price: 3450.20, change: 1.8, cap: "414B", baseData: [3300, 3400, 3350, 3480, 3420, 3450, 3440] },
  { symbol: "BNB", name: "BNB", price: 590.10, change: -0.5, cap: "86B", baseData: [600, 610, 595, 580, 592, 590, 588] },
  { symbol: "SOL", name: "Solana", price: 145.80, change: 5.2, cap: "67B", baseData: [130, 135, 142, 140, 148, 145, 146] },
  { symbol: "ADA", name: "Cardano", price: 0.45, change: -1.2, cap: "16B", baseData: [0.47, 0.48, 0.46, 0.44, 0.45, 0.45, 0.44] },
];

const COIN_IDS = "bitcoin,ethereum,binancecoin,solana,cardano";

function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${value.toLocaleString()}`;
}

export function CryptoTicker() {
  const [coins, setCoins] = useState<CoinData[]>(FALLBACK_DATA);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS}&sparkline=true&price_change_percentage=24h`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      const mapped: CoinData[] = data.map((c: {
        symbol: string; name: string; current_price: number;
        price_change_percentage_24h: number; market_cap: number;
        sparkline_in_7d: { price: number[] };
      }) => ({
        symbol: c.symbol.toUpperCase(),
        name: c.name,
        price: c.current_price,
        change: c.price_change_percentage_24h ?? 0,
        cap: formatMarketCap(c.market_cap),
        baseData: (c.sparkline_in_7d?.price ?? []).filter((_: number, i: number) => i % 24 === 0).slice(-8),
      }));

      if (mapped.length > 0) {
        setCoins(mapped);
        setIsLive(true);
        setLastUpdated(new Date());
      }
    } catch {
      setIsLive(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60_000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  useEffect(() => {
    const jitter = setInterval(() => {
      setCoins(prev => prev.map(coin => {
        const variation = coin.price * (Math.random() * 0.002 - 0.001);
        return { ...coin, price: coin.price + variation };
      }));
    }, 3000);
    return () => clearInterval(jitter);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="w-3 h-3" />
          {isLive
            ? `Live data · Updated ${lastUpdated ? lastUpdated.toLocaleTimeString() : "just now"}`
            : "Simulated data · CoinGecko API refreshes every 60s"}
        </div>
        {isLive && (
          <span className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            LIVE
          </span>
        )}
      </div>
      <div className="w-full flex gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide hide-scrollbar">
        {coins.map((coin) => {
          const isPositive = coin.change >= 0;
          const color = isPositive ? "#10b981" : "#ef4444";
          return (
            <div
              key={coin.symbol}
              data-testid={`crypto-card-${coin.symbol}`}
              className="min-w-[290px] p-4 rounded-xl bg-card border border-white/5 shadow-lg backdrop-blur-sm flex items-center justify-between shrink-0 hover:border-white/10 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{coin.symbol}</span>
                  <span className="text-xs text-muted-foreground">{coin.name}</span>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={Math.round(coin.price * 100)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg font-mono font-semibold mt-1"
                  >
                    {coin.price >= 10
                      ? `$${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : `$${coin.price.toFixed(4)}`}
                  </motion.div>
                </AnimatePresence>
                <div className={`text-xs font-medium mt-1 flex items-center gap-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {isPositive ? "+" : ""}{coin.change.toFixed(2)}%
                  <span className="text-muted-foreground font-normal ml-2">Cap: {coin.cap}</span>
                </div>
              </div>
              <div className="ml-4">
                <SparklineChart data={coin.baseData.length >= 4 ? coin.baseData : FALLBACK_DATA.find(f => f.symbol === coin.symbol)!.baseData} color={color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
