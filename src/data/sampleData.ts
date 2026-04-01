import { Transaction } from "@/types/finance";

export const sampleTransactions: Transaction[] = [
  { id: "1", date: "2026-03-31", category: "Salary", type: "income", amount: 8500, description: "Monthly salary" },
  { id: "2", date: "2026-03-30", category: "Food", type: "expense", amount: 124.50, description: "Grocery shopping" },
  { id: "3", date: "2026-03-29", category: "Transport", type: "expense", amount: 45.00, description: "Uber rides" },
  { id: "4", date: "2026-03-28", category: "Freelance", type: "income", amount: 2200, description: "Client project" },
  { id: "5", date: "2026-03-27", category: "Shopping", type: "expense", amount: 299.99, description: "New headphones" },
  { id: "6", date: "2026-03-26", category: "Entertainment", type: "expense", amount: 15.99, description: "Netflix subscription" },
  { id: "7", date: "2026-03-25", category: "Bills", type: "expense", amount: 180.00, description: "Electricity bill" },
  { id: "8", date: "2026-03-24", category: "Investments", type: "income", amount: 450.00, description: "Dividend payout" },
  { id: "9", date: "2026-03-23", category: "Healthcare", type: "expense", amount: 75.00, description: "Doctor visit" },
  { id: "10", date: "2026-03-22", category: "Education", type: "expense", amount: 49.99, description: "Online course" },
  { id: "11", date: "2026-03-20", category: "Food", type: "expense", amount: 89.00, description: "Restaurant dinner" },
  { id: "12", date: "2026-03-18", category: "Transport", type: "expense", amount: 60.00, description: "Gas refill" },
  { id: "13", date: "2026-03-15", category: "Salary", type: "income", amount: 8500, description: "Monthly salary" },
  { id: "14", date: "2026-03-12", category: "Shopping", type: "expense", amount: 159.00, description: "Clothing" },
  { id: "15", date: "2026-03-10", category: "Bills", type: "expense", amount: 95.00, description: "Internet bill" },
  { id: "16", date: "2026-03-08", category: "Entertainment", type: "expense", amount: 32.00, description: "Movie tickets" },
  { id: "17", date: "2026-03-05", category: "Freelance", type: "income", amount: 1800, description: "Design work" },
  { id: "18", date: "2026-03-03", category: "Food", type: "expense", amount: 67.50, description: "Weekly groceries" },
  { id: "19", date: "2026-03-01", category: "Healthcare", type: "expense", amount: 200.00, description: "Dental checkup" },
  { id: "20", date: "2026-02-28", category: "Investments", type: "income", amount: 320.00, description: "Stock gains" },
];

export const balanceTrendData = [
  { month: "Oct", balance: 18200 },
  { month: "Nov", balance: 21400 },
  { month: "Dec", balance: 19800 },
  { month: "Jan", balance: 23100 },
  { month: "Feb", balance: 25600 },
  { month: "Mar", balance: 28750 },
];
