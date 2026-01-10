import { ProductTotals } from "@/types/inventory";
import StockSummaryCard from "./StockSummaryCard";
import { 
  Package, 
  Gem, 
  CircleDot, 
  Sparkles, 
  Circle, 
  Hexagon,
  Box,
  LayoutGrid,
  Crown
} from "lucide-react";

interface TotalsSummaryProps {
  totals: ProductTotals;
}

const TotalsSummary = ({ totals }: TotalsSummaryProps) => {
  const summaryItems = [
    { title: "Total Necklaces", value: totals.necklaces, icon: Gem, subtitle: "Incl. sets" },
    { title: "Total Bracelets", value: totals.bracelets, icon: CircleDot, subtitle: "Incl. sets" },
    { title: "Total Earrings", value: totals.earrings, icon: Sparkles, subtitle: "Incl. sets" },
    { title: "Total Rings", value: totals.rings, icon: Circle, subtitle: "Incl. sets" },
    { title: "Total Bangles", value: totals.bangles, icon: Hexagon },
    { title: "Total Sets", value: totals.sets, icon: Package },
    { title: "Empty Dummies", value: totals.emptyDummies, icon: Box },
    { title: "Free Spaces", value: totals.freeEarringsSpaces, icon: LayoutGrid },
  ];

  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-gold">
          <Crown className="h-5 w-5 text-accent-foreground" />
        </div>
        <h2 className="text-xl font-display font-semibold text-foreground">
          Stock Summary
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryItems.map((item) => (
          <StockSummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            subtitle={item.subtitle}
          />
        ))}
      </div>
      
      {/* Grand Total */}
      <div className="mt-4">
        <StockSummaryCard
          title="Grand Total"
          value={totals.grandTotal}
          icon={Crown}
          variant="gold"
          subtitle="All products including sets"
        />
      </div>
    </div>
  );
};

export default TotalsSummary;
