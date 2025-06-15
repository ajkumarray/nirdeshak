import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, UserPlus, Mail, User } from "lucide-react";
import { authService } from "@/services/api/publicApi";
import { useAuth } from "@/contexts/AuthContext";

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await authService.login({
          email,
          password,
        });

        if (response.mc === "M01203" && response.lc?.token) {
          // Store token in localStorage
          localStorage.setItem("token", response.lc.token);
          // Update auth context with user data
          login({
            email,
            name: email.split('@')[0] // Using email username as name since it's not provided in response
          });
          toast.success(response.m || "Successfully logged in!");
          navigate("/");
        } else {
          // Handle error case
          const errorMessage = response.err?.errorMessage || response.m || "Failed to log in. Please try again.";
          toast.error(errorMessage);
        }
      } else {
        const response = await authService.signup({
          name,
          email,
          password,
          profilePic: "" // Adding empty profile picture as per API requirement
        });

        if (response.mc === "M01201" && response.lc?.token) {
          // Store token in localStorage
          localStorage.setItem("token", response.lc.token);
          // Update auth context with user data
          login({
            email,
            name
          });
          toast.success(response.m || "Account created successfully!");
          navigate("/");
        } else {
          // Handle error case
          const errorMessage = response.err?.errorMessage || response.m || "Failed to create account. Please try again.";
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      toast.error(isLogin ? "Failed to log in. Please try again." : "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would integrate with Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(`Google ${isLogin ? "login" : "signup"} not implemented in this demo`);
    } catch (error) {
      toast.error(`Failed to ${isLogin ? "log in" : "sign up"} with Google`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-muted-foreground">
          {isLogin
            ? "Enter your credentials to sign in to your account"
            : "Enter your information to get started"}
        </p>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder={isLogin ? "••••••••" : "Create a password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? isLogin
              ? "Signing in..."
              : "Creating account..."
            : isLogin
            ? "Sign in"
            : "Create account"}
          {isLogin ? (
            <LogIn className="ml-2 h-4 w-4" />
          ) : (
            <UserPlus className="ml-2 h-4 w-4" />
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={handleGoogleAuth}
        disabled={isLoading}
      >
        <svg
          className="mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12 h8" />
          <path d="M12 8 v8" />
        </svg>
        Google
      </Button>

      <div className="text-center text-sm">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link
          to={isLogin ? "/signup" : "/login"}
          className="text-primary hover:underline"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm; 