import { StockEntry } from "@/types/inventory";
import InventoryInput from "./InventoryInput";
import { Package } from "lucide-react";

interface SetsSectionProps {
  entry: StockEntry;
  onUpdate: (field: keyof StockEntry, value: number) => void;
}

const SetsSection = ({ entry, onUpdate }: SetsSectionProps) => {
  const sets = [
    { key: "setsWithNecklaces" as keyof StockEntry, label: "Sets with Necklaces" },
    { key: "setsWithBracelets" as keyof StockEntry, label: "Sets with Bracelets" },
    { key: "setsRingsAndEarrings" as keyof StockEntry, label: "Rings & Earrings Sets" },
  ];

  const totalSets = entry.setsWithNecklaces + entry.setsWithBracelets + entry.setsRingsAndEarrings;

  return (
    <div className="card-luxury rounded-2xl p-6 md:p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary/20">
            <Package className="h-5 w-5 text-secondary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground">
            Sets Collection
          </h2>
        </div>
        <div className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
          <span className="text-sm font-medium text-secondary">
            Total Sets: <span className="font-bold">{totalSets}</span>
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {sets.map(({ key, label }) => (
          <InventoryInput
            key={key}
            label={label}
            value={entry[key] as number}
            onChange={(value) => onUpdate(key, value)}
          />
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Note:</span> Items within sets are automatically 
          added to their respective product totals in the summary.
        </p>
      </div>
    </div>
  );
};

export default SetsSection;
