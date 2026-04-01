import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { balanceTrendData } from "@/data/sampleData";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-4 py-3 text-sm border border-primary/20">
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className="font-bold text-foreground text-lg">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

export const BalanceChart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="glass-card p-6 h-full"
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Balance Trend</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Last 6 months overview</p>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
        <TrendingUp className="w-3.5 h-3.5 text-success" />
        <span className="text-xs font-semibold text-success">+18.4%</span>
      </div>
    </div>
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={balanceTrendData}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.35} />
              <stop offset="50%" stopColor="hsl(263, 70%, 50%)" stopOpacity={0.12} />
              <stop offset="100%" stopColor="hsl(263, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
              <stop offset="100%" stopColor="hsl(263, 70%, 50%)" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            stroke="hsl(215, 20%, 35%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="hsl(215, 20%, 35%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            dx={-8}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="url(#strokeGradient)"
            strokeWidth={3}
            fill="url(#balanceGradient)"
            dot={{ fill: 'hsl(217, 91%, 60%)', strokeWidth: 0, r: 0 }}
            activeDot={{ fill: 'hsl(217, 91%, 60%)', strokeWidth: 3, stroke: 'hsl(217, 91%, 60%)', r: 6, style: { filter: 'drop-shadow(0 0 8px hsl(217 91% 60% / 0.5))' } }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);
