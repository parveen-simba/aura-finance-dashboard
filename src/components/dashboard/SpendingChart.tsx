import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useFinance } from "@/context/FinanceContext";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="win-window"
      style={{ padding: "4px 8px", fontSize: 11, minWidth: 110 }}
    >
      <div className="win-titlebar" style={{ fontSize: 10, padding: "2px 4px", marginBottom: 4 }}>
        {payload[0].name}
      </div>
      <div style={{ fontWeight: "bold", color: "#000080", fontSize: 13 }}>
        ${payload[0].value.toFixed(2)}
      </div>
    </div>
  );
};

export const SpendingChart = () => {
  const { spendingByCategory, totalExpenses } = useFinance();

  return (
    <div className="win-window" style={{ height: "100%" }}>
      {/* Title bar */}
      <div className="win-titlebar" style={{ fontSize: 11 }}>
        <span>Spending Breakdown</span>
        <div style={{ flex: 1 }} />
      </div>

      {/* Body */}
      <div style={{ padding: "6px 8px", backgroundColor: "hsl(0 0% 85%)" }}>
        <p style={{ fontSize: 10, color: "#444", margin: "0 0 6px", fontFamily: "'Tahoma', sans-serif" }}>
          By category this month
        </p>

        {/* Inset pie chart */}
        <div className="win-inset" style={{ backgroundColor: "#FFFFFF", position: "relative", height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingByCategory}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={76}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={1}
                stroke="#D4D0C8"
              >
                {spendingByCategory.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#444" }}>Total</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#000080" }}>
                ${(totalExpenses / 1000).toFixed(1)}k
              </div>
            </div>
          </div>
        </div>

        {/* Legend / breakdown list */}
        <div style={{ marginTop: 8 }}>
          {spendingByCategory.slice(0, 5).map((cat) => {
            const pct = totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0;
            return (
              <div key={cat.name} style={{ marginBottom: 5 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 10,
                    marginBottom: 2,
                    fontFamily: "'Tahoma', sans-serif",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: cat.color,
                        border: "1px solid #888",
                        flexShrink: 0,
                      }}
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span style={{ fontWeight: "bold", color: "#000080" }}>
                    {pct.toFixed(0)}%
                  </span>
                </div>
                {/* Win2000 progress bar */}
                <div className="win-progress-track">
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      backgroundColor: cat.color,
                      backgroundImage: `repeating-linear-gradient(90deg, ${cat.color} 0px, ${cat.color} 8px, ${cat.color}CC 8px, ${cat.color}CC 10px)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
