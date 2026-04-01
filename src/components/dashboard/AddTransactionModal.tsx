import { useState } from "react";
import { Plus } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORIES, Category, TransactionType } from "@/types/finance";

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "'Tahoma', sans-serif",
  fontSize: 11,
  color: "#000",
  padding: "3px 4px",
  outline: "none",
  background: "#FFFFFF",
  borderTop: "2px solid #808080",
  borderLeft: "2px solid #808080",
  borderRight: "2px solid #FFFFFF",
  borderBottom: "2px solid #FFFFFF",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontFamily: "'Tahoma', sans-serif",
  marginBottom: 3,
  fontWeight: "bold",
  color: "#000",
};

const errorStyle: React.CSSProperties = {
  fontSize: 10,
  color: "#CC0000",
  marginTop: 2,
  fontFamily: "'Tahoma', sans-serif",
};

export const AddTransactionModal = () => {
  const { addTransaction, role } = useFinance();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (role !== "admin") return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) e.amount = "Enter a valid amount";
    if (!description.trim()) e.description = "Enter a description";
    if (!date) e.date = "Select a date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addTransaction({ amount: Number(amount), category, type, date, description: description.trim() });
    setAmount(""); setDescription(""); setCategory("Food"); setType("expense");
    setDate(new Date().toISOString().split("T")[0]);
    setErrors({});
    setOpen(false);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        className="win-btn-primary"
        onClick={() => setOpen(true)}
        style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
      >
        <Plus style={{ width: 12, height: 12 }} aria-hidden="true" />
        Add Transaction
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Dialog window */}
          <div
            className="win-window"
            style={{ width: "100%", maxWidth: 360, fontFamily: "'Tahoma', sans-serif" }}
          >
            {/* Title bar */}
            <div className="win-titlebar">
              <span id="modal-title">New Transaction</span>
              <div style={{ flex: 1 }} />
              <button
                className="win-titlebar-btn"
                onClick={() => setOpen(false)}
                title="Close"
                aria-label="Close dialog"
                style={{ fontWeight: "bold" }}
              >
                X
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "12px 12px 8px", backgroundColor: "hsl(0 0% 85%)" }}>
              {/* Type radio buttons */}
              <div
                className="win-groupbox"
                style={{ marginBottom: 12 }}
              >
                <span className="win-groupbox-label">Transaction Type</span>
                <div style={{ display: "flex", gap: 16 }}>
                  {(["expense", "income"] as const).map((t) => (
                    <label
                      key={t}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        cursor: "pointer",
                        textTransform: "capitalize",
                        fontFamily: "'Tahoma', sans-serif",
                        color: t === "income" ? "#008000" : "#CC0000",
                        fontWeight: type === t ? "bold" : "normal",
                      }}
                    >
                      <input
                        type="radio"
                        name="txtype"
                        value={t}
                        checked={type === t}
                        onChange={() => setType(t)}
                        style={{ margin: 0 }}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle} htmlFor="tx-amount">Amount ($)</label>
                <input
                  id="tx-amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={inputStyle}
                />
                {errors.amount && <div style={errorStyle}>{errors.amount}</div>}
              </div>

              {/* Description */}
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle} htmlFor="tx-desc">Description</label>
                <input
                  id="tx-desc"
                  type="text"
                  placeholder="What was this for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={inputStyle}
                />
                {errors.description && <div style={errorStyle}>{errors.description}</div>}
              </div>

              {/* Category */}
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle} htmlFor="tx-cat">Category</label>
                <select
                  id="tx-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  style={{
                    ...inputStyle,
                    appearance: "auto",
                  }}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Date */}
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle} htmlFor="tx-date">Date</label>
                <input
                  id="tx-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={inputStyle}
                />
                {errors.date && <div style={errorStyle}>{errors.date}</div>}
              </div>

              {/* Separator */}
              <div
                style={{
                  borderTop: "1px solid #808080",
                  borderBottom: "1px solid #FFFFFF",
                  marginBottom: 10,
                }}
              />

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 6,
                }}
              >
                <button
                  className="win-btn-primary"
                  onClick={handleSubmit}
                  style={{ minWidth: 80 }}
                >
                  OK
                </button>
                <button
                  className="win-btn"
                  onClick={() => setOpen(false)}
                  style={{ minWidth: 80 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
