
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-brand to-brand-dark text-transparent bg-clip-text">404</h1>
        <p className="text-xl text-foreground mb-8">Oops! This page has vanished like a long URL that needs shortening.</p>
        <Button asChild>
          <Link to="/" className="inline-block">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
