
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-4", className)}>
      <div className="container flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-brand to-brand-dark text-transparent bg-clip-text">
            URL Shortener
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
