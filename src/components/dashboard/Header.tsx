import { motion } from "framer-motion";
import { useFinance } from "@/context/FinanceContext";
import { AddTransactionModal } from "./AddTransactionModal";
import { Shield, Eye, Sparkles } from "lucide-react";

export const Header = () => {
  const { role, setRole } = useFinance();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
          style={{ boxShadow: '0 8px 32px -4px hsl(217 91% 60% / 0.4)' }}
        >
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </motion.div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            <span className="gradient-text">Finance</span>{" "}
            <span className="text-foreground">Dashboard</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Welcome back — here's your overview</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 border border-border/50 backdrop-blur-sm">
          {(["viewer", "admin"] as const).map((r) => (
            <motion.button
              key={r}
              onClick={() => setRole(r)}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 capitalize ${
                role === r
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={role === r ? { boxShadow: '0 4px 20px -2px hsl(217 91% 60% / 0.4)' } : {}}
            >
              {r === "admin" ? <Shield className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {r}
            </motion.button>
          ))}
        </div>
        <AddTransactionModal />
      </div>
    </motion.header>
  );
};
