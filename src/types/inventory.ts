export interface StockEntry {
  id: string;
  date: string;
  necklaces: number;
  bracelets: number;
  earrings: number;
  rings: number;
  bangles: number;
  emptyDummies: number;
  freeEarringsSpaces: number;
  setsWithNecklaces: number;
  setsWithBracelets: number;
  setsRingsAndEarrings: number;
}

export interface ProductTotals {
  necklaces: number;
  bracelets: number;
  earrings: number;
  rings: number;
  bangles: number;
  sets: number;
  emptyDummies: number;
  freeEarringsSpaces: number;
  grandTotal: number;
}

export const createEmptyEntry = (date: string): StockEntry => ({
  id: crypto.randomUUID(),
  date,
  necklaces: 0,
  bracelets: 0,
  earrings: 0,
  rings: 0,
  bangles: 0,
  emptyDummies: 0,
  freeEarringsSpaces: 0,
  setsWithNecklaces: 0,
  setsWithBracelets: 0,
  setsRingsAndEarrings: 0,
});

export const calculateTotals = (entry: StockEntry): ProductTotals => {
  const totalSets = entry.setsWithNecklaces + entry.setsWithBracelets + entry.setsRingsAndEarrings;
  
  // Products + their respective items from sets
  const totalNecklaces = entry.necklaces + entry.setsWithNecklaces;
  const totalBracelets = entry.bracelets + entry.setsWithBracelets;
  const totalEarrings = entry.earrings + entry.setsRingsAndEarrings;
  const totalRings = entry.rings + entry.setsRingsAndEarrings;
  
  const grandTotal = 
    totalNecklaces + 
    totalBracelets + 
    totalEarrings + 
    totalRings + 
    entry.bangles + 
    entry.emptyDummies + 
    entry.freeEarringsSpaces;

  return {
    necklaces: totalNecklaces,
    bracelets: totalBracelets,
    earrings: totalEarrings,
    rings: totalRings,
    bangles: entry.bangles,
    sets: totalSets,
    emptyDummies: entry.emptyDummies,
    freeEarringsSpaces: entry.freeEarringsSpaces,
    grandTotal,
  };
};
