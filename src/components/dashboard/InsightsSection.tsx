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
      accent: "text-destructive bg-destructive/10",
    },
    {
      icon: TrendingUp,
      title: "Savings Rate",
      value: `${savingsRate}%`,
      subtitle: "of total income",
      accent: "text-success bg-success/10",
    },
    {
      icon: BarChart3,
      title: "Avg. Daily Spend",
      value: formatCurrency(totalExpenses / 30),
      subtitle: "this month",
      accent: "text-primary bg-primary/10",
    },
    {
      icon: Lightbulb,
      title: "Smart Tip",
      value: Number(savingsRate) > 20 ? "Great saving!" : "Cut spending",
      subtitle: Number(savingsRate) > 20 ? "You're saving well" : "Try reducing expenses by 10%",
      accent: "text-accent bg-accent/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
              className="glass-card-hover p-5"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${insight.accent}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{insight.title}</p>
              <p className="text-lg font-bold text-foreground">{insight.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{insight.subtitle}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
