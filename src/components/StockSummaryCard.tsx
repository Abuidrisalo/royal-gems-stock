import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockSummaryCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: "default" | "gold" | "navy";
  subtitle?: string;
}

const StockSummaryCard = ({ 
  title, 
  value, 
  icon: Icon, 
  variant = "default",
  subtitle 
}: StockSummaryCardProps) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-luxury-lg",
        variant === "gold" && "gradient-gold text-accent-foreground shadow-gold",
        variant === "navy" && "gradient-navy text-primary-foreground",
        variant === "default" && "card-luxury bg-card"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium uppercase tracking-wider",
            variant === "default" ? "text-muted-foreground" : "opacity-80"
          )}>
            {title}
          </p>
          <p className="text-4xl font-display font-bold tracking-tight">
            {value.toLocaleString()}
          </p>
          {subtitle && (
            <p className={cn(
              "text-xs",
              variant === "default" ? "text-muted-foreground" : "opacity-70"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          variant === "gold" && "bg-accent-foreground/10",
          variant === "navy" && "bg-primary-foreground/10",
          variant === "default" && "bg-gold/10"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            variant === "default" && "text-gold"
          )} />
        </div>
      </div>
      
      {/* Decorative element */}
      <div className={cn(
        "absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10",
        variant === "gold" && "bg-accent-foreground",
        variant === "navy" && "bg-primary-foreground",
        variant === "default" && "bg-gold"
      )} />
    </div>
  );
};

export default StockSummaryCard;
