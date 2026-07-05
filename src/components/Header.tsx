
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, List, User } from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const showLogin = true;
  const isOnUrlsPage = location.pathname === "/urls";

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className={cn("w-full py-4 bg-background/95 backdrop-blur-sm border-b sticky top-0 z-10", className)}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="logo-sm.png" alt="" className="w-auto h-9 rounded-lg md:hidden" />
          <img src="logo.png" alt="" className="w-auto h-9 rounded-lg md:block hidden" />
        </Link>

        {showLogin && (
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center text-sm">
                  <User className="h-4 w-4 mr-2" />
                  <span>Hello, {user?.name || user?.email}</span>
                </div>
                {!isOnUrlsPage && (
                  <Link to="/urls">
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4 mr-2" />
                      <span>My URLs</span>
                    </Button>
                  </Link>
                )}
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
                  <span>Sign In</span>
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
        </div>)}
      </div>
    </header>
  );
};

export default Header;
