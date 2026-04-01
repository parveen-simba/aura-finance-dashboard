export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Investments"
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Bills"
  | "Healthcare"
  | "Education"
  | "Other";

export interface Transaction {
  id: string;
  date: string;
  category: Category;
  type: TransactionType;
  amount: number;
  description: string;
}

export type Role = "viewer" | "admin";

export const CATEGORIES: Category[] = [
  "Salary", "Freelance", "Investments", "Food", "Transport",
  "Shopping", "Entertainment", "Bills", "Healthcare", "Education", "Other",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Salary: "#3B82F6",
  Freelance: "#8B5CF6",
  Investments: "#10B981",
  Food: "#F59E0B",
  Transport: "#EF4444",
  Shopping: "#EC4899",
  Entertainment: "#6366F1",
  Bills: "#F97316",
  Healthcare: "#14B8A6",
  Education: "#06B6D4",
  Other: "#6B7280",
};
