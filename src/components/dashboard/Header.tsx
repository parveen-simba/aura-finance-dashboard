import { motion } from "framer-motion";
import { useFinance } from "@/context/FinanceContext";
import { AddTransactionModal } from "./AddTransactionModal";
import { Shield, Eye } from "lucide-react";

export const Header = () => {
  const { role, setRole } = useFinance();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">
          <span className="gradient-text">Finance</span>{" "}
          <span className="text-foreground">Dashboard</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Track your finances with clarity</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5 border border-border">
          {(["viewer", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                role === r ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r === "admin" ? <Shield className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {r}
            </button>
          ))}
        </div>
        <AddTransactionModal />
      </div>
    </motion.header>
  );
};
