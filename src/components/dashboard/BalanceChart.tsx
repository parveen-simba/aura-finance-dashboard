import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { balanceTrendData } from "@/data/sampleData";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="win-window"
      style={{ padding: "4px 8px", fontSize: 11, minWidth: 110 }}
    >
      <div className="win-titlebar" style={{ fontSize: 10, padding: "2px 4px", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontWeight: "bold", color: "#000080", fontSize: 13 }}>
        ${payload[0].value.toLocaleString()}
      </div>
    </div>
  );
};

export const BalanceChart = () => (
  <div className="win-window" style={{ height: "100%" }}>
    {/* Title bar */}
    <div className="win-titlebar">
      <TrendingUp style={{ width: 12, height: 12, flexShrink: 0 }} aria-hidden="true" />
      <span>Balance Trend</span>
      <div style={{ flex: 1 }} />
      <span
        style={{
          fontSize: 10,
          backgroundColor: "#008000",
          color: "#fff",
          padding: "1px 6px",
          fontWeight: "bold",
        }}
      >
        +18.4%
      </span>
    </div>

    {/* Chart body */}
    <div style={{ padding: "6px 4px 4px", backgroundColor: "hsl(0 0% 85%)" }}>
      <p style={{ fontSize: 10, color: "#444", margin: "0 4px 6px", fontFamily: "'Tahoma', sans-serif" }}>
        Last 6 months overview
      </p>

      {/* Inset chart area */}
      <div className="win-inset" style={{ padding: 4, height: 260, backgroundColor: "#FFFFFF" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceTrendData}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000080" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#000080" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="#444"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "#888" }}
              dy={4}
              fontFamily="Tahoma, sans-serif"
            />
            <YAxis
              stroke="#444"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "#888" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              dx={-4}
              fontFamily="Tahoma, sans-serif"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="stepAfter"
              dataKey="balance"
              stroke="#000080"
              strokeWidth={2}
              fill="url(#balanceGradient)"
              dot={{ fill: "#000080", strokeWidth: 1, stroke: "#FFFFFF", r: 3 }}
              activeDot={{ fill: "#FF0000", strokeWidth: 1, stroke: "#000000", r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
