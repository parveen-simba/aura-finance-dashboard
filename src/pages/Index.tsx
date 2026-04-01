import { FinanceProvider } from "@/context/FinanceContext";
import { Header } from "@/components/dashboard/Header";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { motion } from "framer-motion";

const Index = () => (
  <FinanceProvider>
    <div className="min-h-screen bg-background relative">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-success/3 rounded-full blur-3xl" />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8"
      >
        <Header />
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
          <div className="lg:col-span-3">
            <BalanceChart />
          </div>
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
        </div>
        <InsightsSection />
        <TransactionsTable />
      </motion.div>
    </div>
  </FinanceProvider>
);

export default Index;
