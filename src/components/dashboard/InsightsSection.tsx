import { motion } from "framer-motion";
import { TrendingUp, PieChart, Lightbulb, BarChart3 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const InsightsSection = () => {
  const { totalIncome, totalExpenses, highestCategory, spendingByCategory } = useFinance();
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : "0";
  const topAmount = spendingByCategory[0]?.value || 0;

  const insights = [
    {
      icon: PieChart,
      title: "Highest Spending",
      value: highestCategory,
      subtitle: formatCurrency(topAmount),
      gradient: "from-destructive/20 to-destructive/5",
      iconBg: "bg-destructive/15 text-destructive ring-1 ring-destructive/20",
      borderAccent: "hover:border-destructive/40",
    },
    {
      icon: TrendingUp,
      title: "Savings Rate",
      value: `${savingsRate}%`,
      subtitle: "of total income",
      gradient: "from-success/20 to-success/5",
      iconBg: "bg-success/15 text-success ring-1 ring-success/20",
      borderAccent: "hover:border-success/40",
    },
    {
      icon: BarChart3,
      title: "Avg. Daily Spend",
      value: formatCurrency(totalExpenses / 30),
      subtitle: "this month",
      gradient: "from-primary/20 to-primary/5",
      iconBg: "bg-primary/15 text-primary ring-1 ring-primary/20",
      borderAccent: "hover:border-primary/40",
    },
    {
      icon: Lightbulb,
      title: "Smart Tip",
      value: Number(savingsRate) > 20 ? "Great saving!" : "Cut spending",
      subtitle: Number(savingsRate) > 20 ? "Keep up the momentum" : "Try reducing expenses by 10%",
      gradient: "from-accent/20 to-accent/5",
      iconBg: "bg-accent/15 text-accent ring-1 ring-accent/20",
      borderAccent: "hover:border-accent/40",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
        <h3 className="text-lg font-semibold text-foreground">Insights</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${insight.gradient} backdrop-blur-xl p-5 transition-all duration-300 ${insight.borderAccent}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${insight.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase mb-1">{insight.title}</p>
              <p className="text-xl font-bold text-foreground">{insight.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{insight.subtitle}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
