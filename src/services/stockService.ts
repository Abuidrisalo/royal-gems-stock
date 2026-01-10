import { supabase } from "@/integrations/supabase/client";
import { StockEntry } from "@/types/inventory";

export interface DbStockEntry {
  id: string;
  date: string;
  necklaces: number;
  bracelets: number;
  earrings: number;
  rings: number;
  bangles: number;
  empty_dummies: number;
  free_earrings_spaces: number;
  sets_with_necklaces: number;
  sets_with_bracelets: number;
  sets_rings_and_earrings: number;
  created_at: string;
  updated_at: string;
}

// Convert DB format to app format
export const dbToAppEntry = (dbEntry: DbStockEntry): StockEntry => ({
  id: dbEntry.id,
  date: dbEntry.date,
  necklaces: dbEntry.necklaces,
  bracelets: dbEntry.bracelets,
  earrings: dbEntry.earrings,
  rings: dbEntry.rings,
  bangles: dbEntry.bangles,
  emptyDummies: dbEntry.empty_dummies,
  freeEarringsSpaces: dbEntry.free_earrings_spaces,
  setsWithNecklaces: dbEntry.sets_with_necklaces,
  setsWithBracelets: dbEntry.sets_with_bracelets,
  setsRingsAndEarrings: dbEntry.sets_rings_and_earrings,
});

// Convert app format to DB format
export const appToDbEntry = (entry: StockEntry): Omit<DbStockEntry, 'id' | 'created_at' | 'updated_at'> => ({
  date: entry.date,
  necklaces: entry.necklaces,
  bracelets: entry.bracelets,
  earrings: entry.earrings,
  rings: entry.rings,
  bangles: entry.bangles,
  empty_dummies: entry.emptyDummies,
  free_earrings_spaces: entry.freeEarringsSpaces,
  sets_with_necklaces: entry.setsWithNecklaces,
  sets_with_bracelets: entry.setsWithBracelets,
  sets_rings_and_earrings: entry.setsRingsAndEarrings,
});

export const fetchAllEntries = async (): Promise<StockEntry[]> => {
  const { data, error } = await supabase
    .from("stock_entries")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return (data as DbStockEntry[]).map(dbToAppEntry);
};

export const fetchEntryByDate = async (date: string): Promise<StockEntry | null> => {
  const { data, error } = await supabase
    .from("stock_entries")
    .select("*")
    .eq("date", date)
    .maybeSingle();

  if (error) throw error;
  return data ? dbToAppEntry(data as DbStockEntry) : null;
};

export const saveEntry = async (entry: StockEntry): Promise<StockEntry> => {
  const dbData = appToDbEntry(entry);
  
  // Check if entry exists for this date
  const existing = await fetchEntryByDate(entry.date);
  
  if (existing) {
    // Update existing entry
    const { data, error } = await supabase
      .from("stock_entries")
      .update(dbData)
      .eq("date", entry.date)
      .select()
      .single();

    if (error) throw error;
    return dbToAppEntry(data as DbStockEntry);
  } else {
    // Insert new entry
    const { data, error } = await supabase
      .from("stock_entries")
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;
    return dbToAppEntry(data as DbStockEntry);
  }
};

export const deleteEntry = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("stock_entries")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
