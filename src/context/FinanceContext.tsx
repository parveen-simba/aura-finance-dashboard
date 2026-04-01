import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Transaction, Role, TransactionType, Category } from "@/types/finance";
import { sampleTransactions } from "@/data/sampleData";

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterType: TransactionType | "all";
  setFilterType: (t: TransactionType | "all") => void;
  sortField: "date" | "amount";
  setSortField: (f: "date" | "amount") => void;
  sortDir: "asc" | "desc";
  setSortDir: (d: "asc" | "desc") => void;
  filteredTransactions: Transaction[];
  spendingByCategory: { name: string; value: number; color: string }[];
  highestCategory: string;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};

import { CATEGORY_COLORS } from "@/types/finance";

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [role, setRole] = useState<Role>("admin");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<TransactionType | "all">("all");
  const [sortField, setSortField] = useState<"date" | "amount">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...tx, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const totalIncome = useMemo(() => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalExpenses = useMemo(() => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalBalance = totalIncome - totalExpenses;

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (filterType !== "all") result = result.filter((t) => t.type === filterType);
    result.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortField === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });
    return result;
  }, [transactions, searchQuery, filterType, sortField, sortDir]);

  const spendingByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.filter((t) => t.type === "expense").forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map).map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name as Category] || "#6B7280" })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const highestCategory = spendingByCategory[0]?.name || "N/A";

  return (
    <FinanceContext.Provider value={{ transactions, role, setRole, addTransaction, totalBalance, totalIncome, totalExpenses, searchQuery, setSearchQuery, filterType, setFilterType, sortField, setSortField, sortDir, setSortDir, filteredTransactions, spendingByCategory, highestCategory }}>
      {children}
    </FinanceContext.Provider>
  );
};
