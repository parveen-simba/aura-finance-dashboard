import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const cards = [
  {
    key: "balance",
    label: "Total Balance",
    Icon: DollarSign,
    getValue: (b: number) => b,
    iconColor: "#000080",
    titleColor: "#000080",
    change: "+12.5%",
    positive: true,
  },
  {
    key: "income",
    label: "Total Income",
    Icon: TrendingUp,
    getValue: (_: number, i: number) => i,
    iconColor: "#008000",
    titleColor: "#008000",
    change: "+8.2%",
    positive: true,
  },
  {
    key: "expenses",
    label: "Total Expenses",
    Icon: TrendingDown,
    getValue: (_: number, __: number, e: number) => e,
    iconColor: "#CC0000",
    titleColor: "#CC0000",
    change: "-3.1%",
    positive: false,
  },
];

export const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 8,
        marginBottom: 8,
      }}
    >
      {cards.map((card) => {
        const { Icon } = card;
        const value = card.getValue(totalBalance, totalIncome, totalExpenses);

        return (
          <div key={card.key} className="win-window" style={{ overflow: "hidden" }}>
            {/* Mini title bar */}
            <div
              className="win-titlebar"
              style={{ fontSize: 10, padding: "2px 4px", gap: 4 }}
            >
              <Icon style={{ width: 12, height: 12, flexShrink: 0 }} aria-hidden="true" />
              <span>{card.label}</span>
            </div>

            {/* Card body */}
            <div
              style={{
                padding: "10px 12px",
                backgroundColor: "hsl(0 0% 85%)",
              }}
            >
              {/* Value */}
              <div
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: card.titleColor,
                  fontFamily: "'Tahoma', sans-serif",
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}
              >
                {formatCurrency(value)}
              </div>

              {/* Progress bar */}
              <div className="win-progress-track" style={{ marginBottom: 6 }}>
                <div
                  className="win-progress-fill"
                  style={{
                    width: "60%",
                    background: card.positive
                      ? "repeating-linear-gradient(90deg, #000080 0px, #000080 8px, #3399FF 8px, #3399FF 10px)"
                      : "repeating-linear-gradient(90deg, #CC0000 0px, #CC0000 8px, #FF6666 8px, #FF6666 10px)",
                  }}
                />
              </div>

              {/* Change indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 10,
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: card.positive ? "#008000" : "#CC0000",
                  }}
                >
                  {card.change}
                </span>
                <span style={{ color: "#444" }}>vs last month</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
