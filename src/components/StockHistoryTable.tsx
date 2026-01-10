import { StockEntry, calculateTotals } from "@/types/inventory";
import { format } from "date-fns";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface StockHistoryTableProps {
  entries: StockEntry[];
  onDelete: (id: string) => void;
  onView: (entry: StockEntry) => void;
  isDeleting: boolean;
}

const StockHistoryTable = ({ entries, onDelete, onView, isDeleting }: StockHistoryTableProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No stock entries recorded yet.</p>
        <p className="text-sm mt-1">Start by entering today's inventory above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-display text-foreground">Date</TableHead>
            <TableHead className="text-center">Necklaces</TableHead>
            <TableHead className="text-center">Bracelets</TableHead>
            <TableHead className="text-center">Earrings</TableHead>
            <TableHead className="text-center">Rings</TableHead>
            <TableHead className="text-center">Bangles</TableHead>
            <TableHead className="text-center">Sets</TableHead>
            <TableHead className="text-center font-semibold text-gold">Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => {
            const totals = calculateTotals(entry);
            const totalSets = entry.setsWithNecklaces + entry.setsWithBracelets + entry.setsRingsAndEarrings;
            
            return (
              <TableRow key={entry.id} className="group">
                <TableCell className="font-medium">
                  {format(new Date(entry.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-center">{totals.necklaces}</TableCell>
                <TableCell className="text-center">{totals.bracelets}</TableCell>
                <TableCell className="text-center">{totals.earrings}</TableCell>
                <TableCell className="text-center">{totals.rings}</TableCell>
                <TableCell className="text-center">{totals.bangles}</TableCell>
                <TableCell className="text-center">{totalSets}</TableCell>
                <TableCell className="text-center font-bold text-gold">
                  {totals.grandTotal}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(entry)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Stock Entry</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the stock entry for{" "}
                            <span className="font-medium">
                              {format(new Date(entry.date), "MMMM dd, yyyy")}
                            </span>
                            ? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(entry.id)}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockHistoryTable;
