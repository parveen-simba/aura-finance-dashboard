import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Sparkles } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORIES, Category, TransactionType } from "@/types/finance";
import { Input } from "@/components/ui/input";

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
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm shadow-lg transition-all"
        style={{ boxShadow: '0 4px 20px -2px hsl(217 91% 60% / 0.4)' }}
      >
        <Plus className="w-4 h-4" /> Add Transaction
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-md p-7 space-y-6 border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">New Transaction</h3>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex gap-2">
                  {(["expense", "income"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all capitalize ${
                        type === t
                          ? t === "income"
                            ? "bg-success/15 text-success border border-success/30 ring-1 ring-success/20"
                            : "bg-destructive/15 text-destructive border border-destructive/30 ring-1 ring-destructive/20"
                          : "bg-muted/30 text-muted-foreground border border-transparent hover:bg-muted/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block font-medium uppercase tracking-wider">Amount</label>
                  <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-muted/30 border-border/50 rounded-xl h-11" />
                  {errors.amount && <p className="text-xs text-destructive mt-1.5">{errors.amount}</p>}
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block font-medium uppercase tracking-wider">Description</label>
                  <Input placeholder="What was this for?" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-muted/30 border-border/50 rounded-xl h-11" />
                  {errors.description && <p className="text-xs text-destructive mt-1.5">{errors.description}</p>}
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block font-medium uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full h-11 rounded-xl border border-border/50 bg-muted/30 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block font-medium uppercase tracking-wider">Date</label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-muted/30 border-border/50 rounded-xl h-11" />
                  {errors.date && <p className="text-xs text-destructive mt-1.5">{errors.date}</p>}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm shadow-lg transition-all"
                style={{ boxShadow: '0 4px 20px -2px hsl(217 91% 60% / 0.4)' }}
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
