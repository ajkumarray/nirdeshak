import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  useEffect(() => {
    // Update page title
    document.title = `${isLogin ? "Login" : "Sign Up"} - URL Shortener`;
  }, [isLogin]);

  return (
    <div className="flex-1 container max-w-lg flex flex-col items-center justify-center px-4 relative">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-primary absolute top-3 left-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Home
      </Link>
      
      <Card className="w-full">
        <CardContent className="pt-6">
          <AuthForm isLogin={isLogin} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage; 