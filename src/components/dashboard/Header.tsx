import { useFinance } from "@/context/FinanceContext";
import { AddTransactionModal } from "./AddTransactionModal";
import { Shield, Eye } from "lucide-react";

export const Header = () => {
  const { role, setRole } = useFinance();

  return (
    <div className="win-window" style={{ marginBottom: 8 }}>
      {/* Section title bar */}
      <div className="win-titlebar">
        <img
          src="/favicon.png"
          alt="Finance icon"
          style={{ width: 14, height: 14, imageRendering: "pixelated", flexShrink: 0 }}
        />
        <span>Finance Dashboard — Control Panel</span>
        <div style={{ flex: 1 }} />
      </div>

      {/* Header content area */}
      <div
        style={{
          padding: "6px 8px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          backgroundColor: "hsl(0 0% 85%)",
        }}
      >
        {/* Title / branding */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="/favicon.png"
            alt="Logo"
            style={{ width: 32, height: 32, imageRendering: "pixelated" }}
          />
          <div>
            <h1
              style={{
                fontSize: 16,
                fontWeight: "bold",
                margin: 0,
                fontFamily: "'Tahoma', sans-serif",
                lineHeight: 1.2,
              }}
            >
              <span style={{ color: "#000080" }}>Finance</span>{" "}
              <span style={{ color: "#000000" }}>Dashboard</span>
            </h1>
            <p style={{ fontSize: 10, color: "#444", margin: 0 }}>
              Welcome back — here&apos;s your overview
            </p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {/* Role selector — looks like a toolbar group box */}
          <div
            className="win-inset"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "2px 4px",
              gap: 4,
              fontSize: 11,
            }}
            role="group"
            aria-label="Role selection"
          >
            <span style={{ fontSize: 10, color: "#444", marginRight: 2 }}>Role:</span>
            {(["viewer", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={role === r ? "win-sunken" : "win-raised"}
                style={{
                  padding: "2px 8px",
                  fontSize: 11,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "'Tahoma', sans-serif",
                  fontWeight: role === r ? "bold" : "normal",
                  color: role === r ? "#000080" : "#000000",
                  textTransform: "capitalize",
                  backgroundColor: "hsl(0 0% 85%)",
                }}
                aria-pressed={role === r}
              >
                {r === "admin" ? (
                  <Shield style={{ width: 12, height: 12 }} />
                ) : (
                  <Eye style={{ width: 12, height: 12 }} />
                )}
                {r}
              </button>
            ))}
          </div>

          <AddTransactionModal />
        </div>
      </div>
    </div>
  );
};
