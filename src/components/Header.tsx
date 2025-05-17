
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User } from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <header className={cn("w-full py-4 bg-white shadow-md sticky top-0 z-10", className)}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-brand to-brand-dark text-transparent bg-clip-text">
            URL Shortener
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center text-sm">
                <User className="h-4 w-4 mr-2" />
                <span>Hello, {user?.name || user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
