import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORIES, Category, TransactionType } from "@/types/finance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    setAmount(""); setDescription(""); setCategory("Food"); setType("expense"); setDate(new Date().toISOString().split("T")[0]);
    setErrors({});
    setOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm transition-shadow hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
      >
        <Plus className="w-4 h-4" /> Add Transaction
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-md p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold gradient-text">New Transaction</h3>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  {(["expense", "income"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                        type === t
                          ? t === "income" ? "bg-success/20 text-success border border-success/40" : "bg-destructive/20 text-destructive border border-destructive/40"
                          : "bg-muted/50 text-muted-foreground border border-transparent"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Amount</label>
                  <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-muted/50 border-border" />
                  {errors.amount && <p className="text-xs text-destructive mt-1">{errors.amount}</p>}
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Description</label>
                  <Input placeholder="What was this for?" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-muted/50 border-border" />
                  {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full h-10 rounded-md border border-border bg-muted/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Date</label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-muted/50 border-border" />
                  {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm transition-shadow hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
              >
                Add Transaction
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
