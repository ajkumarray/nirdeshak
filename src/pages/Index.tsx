import UrlShortener from "@/components/UrlShortener";
import { useAuth } from "@/contexts/AuthContext";
import { getLocalStorage } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const setLoginFalse = false;

  useEffect(() => {
    const checkAuth = () => {
      const token = getLocalStorage('token');
      if (token) {
        // setLoginFalse(true);
        console.log("logged in")
      }
    }
    checkAuth();
  }, []);

  return (
    <main className="flex flex-col container max-w-4xl px-4" style={{ height: 'calc(100vh - 5rem)' }}>
      { isAuthenticated && setLoginFalse && (
        <div className="mb-8 p-4 bg-accent rounded-lg text-center">
          <h3 className="font-medium">Welcome back, {user?.name || user?.email}!</h3>
          <p className="text-sm text-muted-foreground">You're now logged in and can access all features.</p>
        </div>
      )}

      <section className="text-center my-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Shorten Your Links
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform your long URLs into short, shareable links with just one click.
          Our URL shortener helps you create clean, trackable links instantly.
        </p>
      </section>

      <div className="glass-card rounded-xl p-8 mb-12">
        <UrlShortener />
      </div>

      <div className="flex-grow"></div>

      <section className="mt-4">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-lg bg-accent text-center">
            <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
            <p className="text-muted-foreground">Shorten URLs with just a single click</p>
          </div>
          <div className="p-6 rounded-lg bg-accent text-center">
            <h3 className="text-xl font-semibold mb-2">Free to Use</h3>
            <p className="text-muted-foreground">No sign up or subscription required</p>
          </div>
          <div className="p-6 rounded-lg bg-accent text-center">
            <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
            <p className="text-muted-foreground">Fast and dependable link shortening</p>
          </div>
        </section>

        <footer className="py-6 border-t">
          <div className="container text-center text-sm text-muted-foreground">
            <p>URL Shortener &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default Index;
