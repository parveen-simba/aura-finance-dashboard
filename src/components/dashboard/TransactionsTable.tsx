import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_COLORS, Category } from "@/types/finance";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const TransactionsTable = () => {
  const {
    filteredTransactions,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    sortField,
    setSortField,
    sortDir,
    setSortDir,
  } = useFinance();

  const toggleSort = (field: "date" | "amount") => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const SortArrow = ({ field }: { field: "date" | "amount" }) => {
    if (sortField !== field) return <span style={{ color: "#999", fontSize: 9 }}>&#9660;</span>;
    return sortDir === "asc"
      ? <span style={{ color: "#000080", fontSize: 9, fontWeight: "bold" }}>&#9650;</span>
      : <span style={{ color: "#000080", fontSize: 9, fontWeight: "bold" }}>&#9660;</span>;
  };

  return (
    <div className="win-window">
      {/* Title bar */}
      <div className="win-titlebar">
        <span>Transactions</span>
        <div
          style={{
            fontSize: 10,
            backgroundColor: "#808080",
            color: "#fff",
            padding: "1px 6px",
            marginLeft: 6,
          }}
        >
          {filteredTransactions.length}
        </div>
        <div style={{ flex: 1 }} />
      </div>

      {/* Toolbar: search + filter */}
      <div className="win-toolbar">
        {/* Search field */}
        <span style={{ fontSize: 10, color: "#444", marginRight: 2 }}>Search:</span>
        <div className="win-inset" style={{ display: "inline-flex", alignItems: "center", padding: "1px 4px" }}>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "'Tahoma', sans-serif",
              fontSize: 11,
              width: 180,
              color: "#000",
            }}
            aria-label="Search transactions"
          />
        </div>

        <span className="win-separator" aria-hidden="true" />

        {/* Filter buttons */}
        <span style={{ fontSize: 10, color: "#444", marginRight: 2 }}>Filter:</span>
        {(["all", "income", "expense"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={filterType === type ? "win-sunken" : "win-raised"}
            style={{
              padding: "2px 8px",
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "'Tahoma', sans-serif",
              fontWeight: filterType === type ? "bold" : "normal",
              color: filterType === type ? "#000080" : "#000",
              textTransform: "capitalize",
              backgroundColor: "hsl(0 0% 85%)",
            }}
            aria-pressed={filterType === type}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table area — inset like a list view */}
      <div
        className="win-inset scrollbar-thin"
        style={{
          margin: 6,
          backgroundColor: "#FFFFFF",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: 400,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 11,
            fontFamily: "'Tahoma', sans-serif",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "hsl(0 0% 85%)",
                position: "sticky",
                top: 0,
              }}
            >
              {[
                { label: "Date", field: "date" as const, sortable: true },
                { label: "Category", field: null, sortable: false },
                { label: "Description", field: null, sortable: false },
                { label: "Type", field: null, sortable: false },
                { label: "Amount", field: "amount" as const, sortable: true, align: "right" },
              ].map(({ label, field, sortable, align }) => (
                <th
                  key={label}
                  onClick={sortable && field ? () => toggleSort(field) : undefined}
                  style={{
                    padding: "3px 6px",
                    textAlign: (align as any) || "left",
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#000",
                    borderBottom: "2px solid #808080",
                    borderRight: "1px solid #C0C0C0",
                    cursor: sortable ? "pointer" : "default",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    /* Column header looks raised */
                    borderTop: "1px solid #FFFFFF",
                    borderLeft: "1px solid #FFFFFF",
                    backgroundColor: "hsl(0 0% 85%)",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                    {label}
                    {sortable && field && <SortArrow field={field} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, i) => (
              <tr
                key={tx.id}
                style={{
                  backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#EEF0F8",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#000080";
                  Array.from((e.currentTarget as HTMLElement).querySelectorAll("td")).forEach(
                    (td) => { td.style.color = "#FFFFFF"; }
                  );
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    i % 2 === 0 ? "#FFFFFF" : "#EEF0F8";
                  Array.from((e.currentTarget as HTMLElement).querySelectorAll("td")).forEach(
                    (td) => { td.style.color = ""; }
                  );
                }}
              >
                <td style={{ padding: "2px 6px", borderBottom: "1px solid #D4D0C8", whiteSpace: "nowrap", color: "#444" }}>
                  {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </td>
                <td style={{ padding: "2px 6px", borderBottom: "1px solid #D4D0C8", whiteSpace: "nowrap" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: CATEGORY_COLORS[tx.category as Category] || "#6B7280",
                        border: "1px solid #888",
                        flexShrink: 0,
                      }}
                    />
                    {tx.category}
                  </div>
                </td>
                <td style={{ padding: "2px 6px", borderBottom: "1px solid #D4D0C8" }}>
                  {tx.description}
                </td>
                <td style={{ padding: "2px 6px", borderBottom: "1px solid #D4D0C8", whiteSpace: "nowrap" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0px 6px",
                      fontSize: 10,
                      fontWeight: "bold",
                      backgroundColor: tx.type === "income" ? "#008000" : "#CC0000",
                      color: "#FFFFFF",
                      textTransform: "capitalize",
                    }}
                  >
                    {tx.type}
                  </span>
                </td>
                <td
                  style={{
                    padding: "2px 6px",
                    borderBottom: "1px solid #D4D0C8",
                    textAlign: "right",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    color: tx.type === "income" ? "#008000" : "#CC0000",
                  }}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "32px 16px",
              fontSize: 11,
              color: "#444",
              fontFamily: "'Tahoma', sans-serif",
            }}
          >
            No transactions found. Try adjusting your search or filters.
          </div>
        )}
      </div>

      {/* Status bar at bottom of panel */}
      <div
        className="win-statusbar"
        style={{ margin: "0 6px 6px", fontSize: 10 }}
        role="status"
      >
        <div className="win-inset" style={{ padding: "1px 6px" }}>
          {filteredTransactions.length} object(s)
        </div>
      </div>
    </div>
  );
};
