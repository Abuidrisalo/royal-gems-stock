import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllEntries, fetchEntryByDate, saveEntry, deleteEntry } from "@/services/stockService";
import { StockEntry } from "@/types/inventory";

export const useStockEntries = () => {
  return useQuery({
    queryKey: ["stock-entries"],
    queryFn: fetchAllEntries,
  });
};

export const useStockEntryByDate = (date: string) => {
  return useQuery({
    queryKey: ["stock-entry", date],
    queryFn: () => fetchEntryByDate(date),
  });
};

export const useSaveStockEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock-entries"] });
      queryClient.invalidateQueries({ queryKey: ["stock-entry"] });
    },
  });
};

export const useDeleteStockEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock-entries"] });
    },
  });
};
