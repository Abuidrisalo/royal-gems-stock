import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InventoryInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const InventoryInput = ({ label, value, onChange, className }: InventoryInputProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      <Input
        type="number"
        min="0"
        value={value || ""}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="input-jewelry h-12 text-lg font-medium text-center focus:ring-2 focus:ring-gold/30"
        placeholder="0"
      />
    </div>
  );
};

export default InventoryInput;
