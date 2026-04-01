import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const cards = [
  { key: "balance", label: "Total Balance", icon: DollarSign, getValue: (b: number) => b, accent: "primary" },
  { key: "income", label: "Total Income", icon: TrendingUp, getValue: (_: number, i: number) => i, accent: "success" },
  { key: "expenses", label: "Total Expenses", icon: TrendingDown, getValue: (_: number, __: number, e: number) => e, accent: "destructive" },
] as const;

const accentStyles = {
  primary: "from-primary/20 to-accent/10 border-primary/30 hover:border-primary/60 hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.4)]",
  success: "from-success/20 to-success/5 border-success/30 hover:border-success/60 hover:shadow-[0_0_40px_-8px_hsl(var(--success)/0.4)]",
  destructive: "from-destructive/20 to-destructive/5 border-destructive/30 hover:border-destructive/60 hover:shadow-[0_0_40px_-8px_hsl(var(--destructive)/0.4)]",
};

const iconStyles = {
  primary: "bg-primary/20 text-primary",
  success: "bg-success/20 text-success",
  destructive: "bg-destructive/20 text-destructive",
};

export const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const value = card.getValue(totalBalance, totalIncome, totalExpenses);
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`relative overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-xl p-6 transition-all duration-300 cursor-default ${accentStyles[card.accent]}`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
              <div className={`p-2 rounded-lg ${iconStyles[card.accent]}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-foreground">{formatCurrency(value)}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
