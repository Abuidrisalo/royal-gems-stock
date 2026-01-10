import { Crown } from "lucide-react";

const Header = () => {
  return (
    <header className="gradient-navy py-6 px-8 shadow-luxury-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-gold/20 backdrop-blur">
            <Crown className="h-8 w-8 text-gold" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground tracking-wide">
              Royal Jewellery Co
            </h1>
            <p className="text-gold-light text-sm font-light tracking-widest uppercase">
              Stock Inventory Management
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-primary-foreground/60 text-sm">Since 1985</span>
          <div className="w-1 h-1 rounded-full bg-gold" />
          <span className="text-gold text-sm font-medium">Premium Collection</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
