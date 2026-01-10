import { History } from "lucide-react";
import { StockEntry } from "@/types/inventory";
import StockHistoryTable from "./StockHistoryTable";

interface HistorySectionProps {
  entries: StockEntry[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onView: (entry: StockEntry) => void;
  isDeleting: boolean;
}

const HistorySection = ({ 
  entries, 
  isLoading, 
  onDelete, 
  onView, 
  isDeleting 
}: HistorySectionProps) => {
  return (
    <div className="card-luxury rounded-2xl p-6 md:p-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-navy/10">
          <History className="h-5 w-5 text-navy" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold text-foreground">
            Stock History
          </h2>
          <p className="text-sm text-muted-foreground">
            View and manage past inventory records
          </p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      ) : (
        <StockHistoryTable 
          entries={entries} 
          onDelete={onDelete} 
          onView={onView}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default HistorySection;
