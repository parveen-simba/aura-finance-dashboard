import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useFinance } from "@/context/FinanceContext";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-4 py-3 text-sm border border-primary/20">
      <p className="text-muted-foreground text-xs mb-1">{payload[0].name}</p>
      <p className="font-bold text-foreground text-lg">${payload[0].value.toFixed(2)}</p>
    </div>
  );
};

export const SpendingChart = () => {
  const { spendingByCategory, totalExpenses } = useFinance();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-6 h-full"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Spending Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">By category this month</p>
      </div>
      <div className="h-[180px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spendingByCategory}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
              cornerRadius={4}
            >
              {spendingByCategory.map((entry, i) => (
                <Cell key={i} fill={entry.color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-foreground">
              ${(totalExpenses / 1000).toFixed(1)}k
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2.5 mt-5">
        {spendingByCategory.slice(0, 5).map((cat) => {
          const pct = totalExpenses > 0 ? (cat.value / totalExpenses * 100) : 0;
          return (
            <div key={cat.name} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{cat.name}</span>
                </div>
                <span className="text-xs font-medium text-foreground">{pct.toFixed(0)}%</span>
              </div>
              <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
