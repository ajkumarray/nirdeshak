
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SignupForm from "@/components/SignupForm";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

const Signup = () => {
  useEffect(() => {
    // Update page title
    document.title = "Sign Up - URL Shortener";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 container max-w-lg flex flex-col items-center justify-center px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-primary"
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
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
