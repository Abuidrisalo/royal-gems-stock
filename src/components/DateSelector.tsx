import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const DateSelector = ({ date, onDateChange }: DateSelectorProps) => {
  return (
    <div className="card-luxury rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-navy/10">
          <Calendar className="h-5 w-5 text-navy" />
        </div>
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">
            Stock Date
          </h2>
          <p className="text-sm text-muted-foreground">
            Select the date for this stock entry
          </p>
        </div>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-medium px-6 py-6 border-2 border-gold/30 hover:border-gold hover:bg-gold/5 transition-all",
              "text-foreground"
            )}
          >
            <Calendar className="mr-3 h-5 w-5 text-gold" />
            <span className="text-lg">{format(date, "PPPP")}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && onDateChange(newDate)}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
