import { StockEntry } from "@/types/inventory";
import InventoryInput from "./InventoryInput";
import { 
  Gem, 
  CircleDot, 
  Sparkles, 
  Circle,
  Hexagon,
  Box,
  LayoutGrid
} from "lucide-react";

interface ProductsSectionProps {
  entry: StockEntry;
  onUpdate: (field: keyof StockEntry, value: number) => void;
}

const ProductsSection = ({ entry, onUpdate }: ProductsSectionProps) => {
  const products = [
    { key: "necklaces" as keyof StockEntry, label: "Necklaces", icon: Gem },
    { key: "bracelets" as keyof StockEntry, label: "Bracelets", icon: CircleDot },
    { key: "earrings" as keyof StockEntry, label: "Earrings", icon: Sparkles },
    { key: "rings" as keyof StockEntry, label: "Rings", icon: Circle },
    { key: "bangles" as keyof StockEntry, label: "Bangles", icon: Hexagon },
    { key: "emptyDummies" as keyof StockEntry, label: "Empty Dummies", icon: Box },
    { key: "freeEarringsSpaces" as keyof StockEntry, label: "Free Earrings Spaces", icon: LayoutGrid },
  ];

  return (
    <div className="card-luxury rounded-2xl p-6 md:p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gold/10">
          <Gem className="h-5 w-5 text-gold" />
        </div>
        <h2 className="text-xl font-display font-semibold text-foreground">
          Individual Products
        </h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {products.map(({ key, label, icon: Icon }) => (
          <div key={key} className="relative group">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon className="h-4 w-4 text-gold" />
            </div>
            <InventoryInput
              label={label}
              value={entry[key] as number}
              onChange={(value) => onUpdate(key, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
