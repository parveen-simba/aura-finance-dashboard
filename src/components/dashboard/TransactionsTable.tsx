import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { Input } from "@/components/ui/input";
import { CATEGORY_COLORS, Category } from "@/types/finance";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const TransactionsTable = () => {
  const { filteredTransactions, searchQuery, setSearchQuery, filterType, setFilterType, sortField, setSortField, sortDir, setSortDir } = useFinance();

  const toggleSort = (field: "date" | "amount") => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const SortIcon = ({ field }: { field: "date" | "amount" }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 text-primary" /> : <ChevronDown className="w-3 h-3 text-primary" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
          <h3 className="text-lg font-semibold text-foreground">Transactions</h3>
          <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full ml-1">
            {filteredTransactions.length}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/30 border-border/50 h-9 text-sm w-full sm:w-52 rounded-xl focus:bg-muted/50 transition-colors"
            />
          </div>
          <div className="flex gap-1 bg-muted/30 rounded-xl p-1 border border-border/30">
            {(["all", "income", "expense"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 capitalize ${
                  filterType === type
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th
                className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => toggleSort("date")}
              >
                <span className="flex items-center gap-1.5">Date <SortIcon field="date" /></span>
              </th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Category</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Description</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Type</th>
              <th
                className="text-right py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => toggleSort("amount")}
              >
                <span className="flex items-center justify-end gap-1.5">Amount <SortIcon field="amount" /></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredTransactions.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors group"
                >
                  <td className="py-3.5 px-4 text-muted-foreground text-sm">
                    {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: CATEGORY_COLORS[tx.category as Category] || '#6B7280' }}
                      />
                      <span className="text-sm text-foreground">{tx.category}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-foreground text-sm">{tx.description}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      tx.type === "income"
                        ? "bg-success/10 text-success ring-1 ring-success/20"
                        : "bg-destructive/10 text-destructive ring-1 ring-destructive/20"
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 text-right font-semibold text-sm ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                    {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No transactions found</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
