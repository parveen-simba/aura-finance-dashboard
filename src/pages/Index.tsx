import { FinanceProvider } from "@/context/FinanceContext";
import { Header } from "@/components/dashboard/Header";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { InsightsSection } from "@/components/dashboard/InsightsSection";

const Index = () => (
  <FinanceProvider>
    {/* Win2000 desktop background (teal-ish like classic Windows) */}
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#008080", fontFamily: "'Tahoma', 'Verdana', Arial, sans-serif" }}
    >
      {/* Main application window */}
      <div
        className="win-window"
        style={{ margin: "8px", minHeight: "calc(100vh - 16px)", display: "flex", flexDirection: "column" }}
      >
        {/* Application title bar */}
        <div className="win-titlebar" style={{ padding: "3px 4px 3px 6px" }}>
          {/* App icon */}
          <img
            src="/favicon.png"
            alt="App icon"
            style={{ width: 16, height: 16, imageRendering: "pixelated", flexShrink: 0 }}
          />
          <span style={{ flex: 1 }}>Aura Finance Dashboard</span>
          <button className="win-titlebar-btn" title="Minimize" aria-label="Minimize">_</button>
          <button className="win-titlebar-btn" title="Maximize" aria-label="Maximize">&#9633;</button>
          <button
            className="win-titlebar-btn"
            title="Close"
            aria-label="Close"
            style={{ marginLeft: 2, fontWeight: "bold" }}
          >
            X
          </button>
        </div>

        {/* Menu bar */}
        <nav className="win-menubar" role="menubar">
          {["File", "Edit", "View", "Tools", "Reports", "Window", "Help"].map((item) => (
            <button key={item} className="win-menu-item" role="menuitem">
              {item}
            </button>
          ))}
        </nav>

        {/* Toolbar */}
        <div className="win-toolbar" role="toolbar" aria-label="Standard toolbar">
          {[
            { label: "Back", char: "←" },
            { label: "Forward", char: "→" },
            { label: "Refresh", char: "↻" },
          ].map(({ label, char }) => (
            <button key={label} className="win-btn" style={{ minWidth: 36, padding: "2px 6px" }} title={label} aria-label={label}>
              {char}
            </button>
          ))}
          <span className="win-separator" aria-hidden="true" />
          <span style={{ fontSize: 10, color: "#444", marginRight: 4 }}>Address:</span>
          <div
            className="win-inset"
            style={{ display: "inline-flex", alignItems: "center", padding: "1px 4px", flex: 1, maxWidth: 340, fontSize: 11 }}
          >
            C:\Finance\Dashboard\Overview
          </div>
          <button className="win-btn" style={{ minWidth: 36, padding: "2px 8px", marginLeft: 4 }}>Go</button>
        </div>

        {/* Main content area */}
        <main
          style={{ flex: 1, padding: "8px", overflowY: "auto", backgroundColor: "hsl(0 0% 85%)" }}
        >
          <Header />

          <div style={{ marginTop: 8 }}>
            <SummaryCards />
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-5 gap-2"
            style={{ marginTop: 8 }}
          >
            <div className="lg:col-span-3">
              <BalanceChart />
            </div>
            <div className="lg:col-span-2">
              <SpendingChart />
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <InsightsSection />
          </div>

          <div style={{ marginTop: 8 }}>
            <TransactionsTable />
          </div>
        </main>

        {/* Status bar */}
        <footer className="win-statusbar" role="status">
          <div className="win-inset" style={{ padding: "1px 8px", flex: 1, maxWidth: 280, fontSize: 10 }}>
            Ready
          </div>
          <div className="win-inset" style={{ padding: "1px 8px", fontSize: 10 }}>
            Finance Dashboard v2.0
          </div>
          <div className="win-inset" style={{ padding: "1px 8px", fontSize: 10 }}>
            {new Date().toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })}
          </div>
        </footer>
      </div>

      {/* Win2000 Taskbar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          backgroundColor: "#D4D0C8",
          borderTop: "2px solid #FFFFFF",
          boxShadow: "inset 0 1px 0 #FFFFFF",
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "0 4px",
          zIndex: 100,
          fontFamily: "'Tahoma', sans-serif",
          fontSize: 11,
        }}
        role="toolbar"
        aria-label="Taskbar"
      >
        {/* Start button */}
        <button
          style={{
            height: 22,
            padding: "0 8px",
            backgroundColor: "#D4D0C8",
            borderTop: "2px solid #FFFFFF",
            borderLeft: "2px solid #FFFFFF",
            borderRight: "2px solid #808080",
            borderBottom: "2px solid #808080",
            fontWeight: "bold",
            fontSize: 11,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "'Tahoma', sans-serif",
          }}
          aria-label="Start"
        >
          <span style={{ color: "#008000", fontWeight: "900" }}>&#9641;</span>
          <span>Start</span>
        </button>

        <div
          style={{
            width: 1,
            height: 20,
            background: "#808080",
            margin: "0 4px",
          }}
          aria-hidden="true"
        />

        {/* Active window button in taskbar */}
        <div
          style={{
            height: 22,
            padding: "0 8px",
            backgroundColor: "#D4D0C8",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderRight: "2px solid #FFFFFF",
            borderBottom: "2px solid #FFFFFF",
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            gap: 4,
            minWidth: 120,
            maxWidth: 200,
            overflow: "hidden",
            whiteSpace: "nowrap",
            boxShadow: "inset 1px 1px 0 #A0A0A0",
          }}
        >
          <img src="/favicon.png" alt="" style={{ width: 14, height: 14 }} aria-hidden="true" />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>Aura Finance</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* System tray */}
        <div
          className="win-inset"
          style={{
            height: 22,
            padding: "0 8px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 10,
          }}
        >
          <span>&#128266;</span>
          <span>&#128246;</span>
          <span style={{ fontWeight: "bold" }}>
            {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </div>
  </FinanceProvider>
);

export default Index;
