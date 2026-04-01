import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const cards = [
  {
    key: "balance",
    label: "Total Balance",
    icon: DollarSign,
    getValue: (b: number) => b,
    accent: "primary" as const,
    change: "+12.5%",
    positive: true,
  },
  {
    key: "income",
    label: "Total Income",
    icon: TrendingUp,
    getValue: (_: number, i: number) => i,
    accent: "success" as const,
    change: "+8.2%",
    positive: true,
  },
  {
    key: "expenses",
    label: "Total Expenses",
    icon: TrendingDown,
    getValue: (_: number, __: number, e: number) => e,
    accent: "destructive" as const,
    change: "-3.1%",
    positive: false,
  },
];

const accentConfig = {
  primary: {
    card: "bg-gradient-to-br from-primary/15 via-card/80 to-accent/10 border-primary/20 hover:border-primary/50",
    icon: "bg-primary/15 text-primary ring-1 ring-primary/20",
    glow: "hsl(217 91% 60% / 0.3)",
    dot: "bg-primary",
  },
  success: {
    card: "bg-gradient-to-br from-success/15 via-card/80 to-success/5 border-success/20 hover:border-success/50",
    icon: "bg-success/15 text-success ring-1 ring-success/20",
    glow: "hsl(142 71% 45% / 0.3)",
    dot: "bg-success",
  },
  destructive: {
    card: "bg-gradient-to-br from-destructive/15 via-card/80 to-destructive/5 border-destructive/20 hover:border-destructive/50",
    icon: "bg-destructive/15 text-destructive ring-1 ring-destructive/20",
    glow: "hsl(0 84% 60% / 0.3)",
    dot: "bg-destructive",
  },
};

export const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const value = card.getValue(totalBalance, totalIncome, totalExpenses);
        const config = accentConfig[card.accent];
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03, y: -4 }}
            className={`stat-card ${config.card}`}
            style={{ transition: 'box-shadow 0.4s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px -10px ${config.glow}`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            {/* Decorative orb */}
            <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${config.dot} opacity-10 blur-2xl`} />

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-medium text-muted-foreground tracking-wide">{card.label}</span>
              <div className={`p-2.5 rounded-xl ${config.icon}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">{formatCurrency(value)}</p>
            <div className="flex items-center gap-1.5 mt-3">
              {card.positive ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-success" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-destructive" />
              )}
              <span className={`text-xs font-semibold ${card.positive ? "text-success" : "text-destructive"}`}>
                {card.change}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
