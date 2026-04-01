import { FinanceProvider } from "@/context/FinanceContext";
import { Header } from "@/components/dashboard/Header";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { InsightsSection } from "@/components/dashboard/InsightsSection";

const Index = () => (
  <FinanceProvider>
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
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
    </div>
  </FinanceProvider>
);

export default Index;
