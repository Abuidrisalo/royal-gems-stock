import { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import DateSelector from "@/components/DateSelector";
import ProductsSection from "@/components/ProductsSection";
import SetsSection from "@/components/SetsSection";
import TotalsSummary from "@/components/TotalsSummary";
import HistorySection from "@/components/HistorySection";
import { Button } from "@/components/ui/button";
import { StockEntry, createEmptyEntry, calculateTotals } from "@/types/inventory";
import { useStockEntries, useStockEntryByDate, useSaveStockEntry, useDeleteStockEntry } from "@/hooks/useStockEntries";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateString = format(selectedDate, "yyyy-MM-dd");
  
  const [entry, setEntry] = useState<StockEntry>(() => createEmptyEntry(dateString));

  const { data: allEntries = [], isLoading: isLoadingAll } = useStockEntries();
  const { data: existingEntry, isLoading: isLoadingEntry } = useStockEntryByDate(dateString);
  const saveEntryMutation = useSaveStockEntry();
  const deleteEntryMutation = useDeleteStockEntry();

  // Load existing entry when date changes
  useEffect(() => {
    if (existingEntry) {
      setEntry(existingEntry);
    } else if (!isLoadingEntry) {
      setEntry(createEmptyEntry(dateString));
    }
  }, [existingEntry, dateString, isLoadingEntry]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleUpdateField = (field: keyof StockEntry, value: number) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await saveEntryMutation.mutateAsync(entry);
      toast.success("Stock entry saved successfully!", {
        description: `Entry for ${format(selectedDate, "MMMM dd, yyyy")} has been saved.`,
      });
    } catch (error) {
      toast.error("Failed to save stock entry", {
        description: "Please try again.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntryMutation.mutateAsync(id);
      toast.success("Stock entry deleted");
    } catch (error) {
      toast.error("Failed to delete entry");
    }
  };

  const handleViewEntry = (viewEntry: StockEntry) => {
    setSelectedDate(new Date(viewEntry.date));
    setEntry(viewEntry);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setEntry(createEmptyEntry(dateString));
    toast.info("Form cleared");
  };

  const totals = useMemo(() => calculateTotals(entry), [entry]);

  const hasChanges = useMemo(() => {
    if (!existingEntry) return true;
    return JSON.stringify(entry) !== JSON.stringify(existingEntry);
  }, [entry, existingEntry]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Date Selection with Actions */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <DateSelector date={selectedDate} onDateChange={handleDateChange} />
          </div>
          <div className="flex items-end gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="h-12 px-6"
              disabled={saveEntryMutation.isPending}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button
              onClick={handleSave}
              disabled={saveEntryMutation.isPending || !hasChanges}
              className="h-12 px-8 gradient-gold text-accent-foreground font-semibold shadow-gold hover:shadow-luxury-lg transition-all"
            >
              {saveEntryMutation.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-foreground mr-2" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {existingEntry ? "Update Entry" : "Save Entry"}
            </Button>
          </div>
        </div>

        {/* Loading indicator for date */}
        {isLoadingEntry && (
          <div className="text-center text-muted-foreground text-sm">
            Loading entry for {format(selectedDate, "MMMM dd, yyyy")}...
          </div>
        )}
        
        {/* Products Input */}
        <ProductsSection entry={entry} onUpdate={handleUpdateField} />
        
        {/* Sets Input */}
        <SetsSection entry={entry} onUpdate={handleUpdateField} />
        
        {/* Totals Summary */}
        <TotalsSummary totals={totals} />

        {/* History Section */}
        <HistorySection
          entries={allEntries}
          isLoading={isLoadingAll}
          onDelete={handleDelete}
          onView={handleViewEntry}
          isDeleting={deleteEntryMutation.isPending}
        />
        
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
