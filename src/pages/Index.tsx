import { useState, useMemo } from "react";
import { format } from "date-fns";
import Header from "@/components/Header";
import DateSelector from "@/components/DateSelector";
import ProductsSection from "@/components/ProductsSection";
import SetsSection from "@/components/SetsSection";
import TotalsSummary from "@/components/TotalsSummary";
import { StockEntry, createEmptyEntry, calculateTotals } from "@/types/inventory";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entry, setEntry] = useState<StockEntry>(() => 
    createEmptyEntry(format(new Date(), "yyyy-MM-dd"))
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setEntry((prev) => ({ ...prev, date: format(date, "yyyy-MM-dd") }));
  };

  const handleUpdateField = (field: keyof StockEntry, value: number) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
  };

  const totals = useMemo(() => calculateTotals(entry), [entry]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Date Selection */}
        <DateSelector date={selectedDate} onDateChange={handleDateChange} />
        
        {/* Products Input */}
        <ProductsSection entry={entry} onUpdate={handleUpdateField} />
        
        {/* Sets Input */}
        <SetsSection entry={entry} onUpdate={handleUpdateField} />
        
        {/* Totals Summary */}
        <TotalsSummary totals={totals} />
        
        {/* Footer Note */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Royal Jewellery Co © {new Date().getFullYear()} — Stock Management System
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
