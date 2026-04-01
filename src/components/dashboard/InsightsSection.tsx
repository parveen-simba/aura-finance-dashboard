import { TrendingUp, PieChart, Lightbulb, BarChart3 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const InsightsSection = () => {
  const { totalIncome, totalExpenses, highestCategory, spendingByCategory } = useFinance();
  const savingsRate = totalIncome > 0
    ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)
    : "0";
  const topAmount = spendingByCategory[0]?.value || 0;

  const insights = [
    {
      Icon: PieChart,
      title: "Highest Spending",
      value: highestCategory,
      subtitle: formatCurrency(topAmount),
      valueColor: "#CC0000",
    },
    {
      Icon: TrendingUp,
      title: "Savings Rate",
      value: `${savingsRate}%`,
      subtitle: "of total income",
      valueColor: "#008000",
    },
    {
      Icon: BarChart3,
      title: "Avg. Daily Spend",
      value: formatCurrency(totalExpenses / 30),
      subtitle: "this month",
      valueColor: "#000080",
    },
    {
      Icon: Lightbulb,
      title: "Smart Tip",
      value: Number(savingsRate) > 20 ? "Great saving!" : "Cut spending",
      subtitle:
        Number(savingsRate) > 20
          ? "Keep up the momentum"
          : "Try reducing expenses by 10%",
      valueColor: "#804000",
    },
  ];

  return (
    <div className="win-window">
      {/* Title bar */}
      <div className="win-titlebar">
        <Lightbulb style={{ width: 12, height: 12, flexShrink: 0 }} aria-hidden="true" />
        <span>Insights</span>
      </div>

      {/* Grid of insight panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 8,
          padding: 8,
          backgroundColor: "hsl(0 0% 85%)",
        }}
      >
        {insights.map((insight) => {
          const { Icon } = insight;
          return (
            <div
              key={insight.title}
              className="win-window"
              style={{ overflow: "hidden" }}
            >
              {/* Mini title bar per insight */}
              <div
                className="win-titlebar"
                style={{ fontSize: 10, padding: "2px 4px", gap: 4 }}
              >
                <Icon style={{ width: 11, height: 11, flexShrink: 0 }} aria-hidden="true" />
                <span>{insight.title}</span>
              </div>

              <div
                style={{
                  padding: "8px 10px",
                  backgroundColor: "hsl(0 0% 85%)",
                }}
              >
                {/* Main value */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: insight.valueColor,
                    fontFamily: "'Tahoma', sans-serif",
                    lineHeight: 1.2,
                    marginBottom: 4,
                    wordBreak: "break-word",
                  }}
                >
                  {insight.value}
                </div>

                {/* Separator */}
                <div
                  style={{
                    borderTop: "1px solid #999",
                    borderBottom: "1px solid #fff",
                    marginBottom: 4,
                  }}
                />

                {/* Subtitle */}
                <div style={{ fontSize: 10, color: "#444", fontFamily: "'Tahoma', sans-serif" }}>
                  {insight.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
