import UrlShortener from "@/components/UrlShortener";
import { Zap, Gift, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Quick & Easy",
    description: "Shorten URLs with just a single click",
  },
  {
    icon: Gift,
    title: "Free to Use",
    description: "No sign up or subscription required",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    description: "Fast and dependable link shortening",
  },
];

const Index = () => {
  return (
    <main className="flex flex-col container max-w-4xl px-4" style={{ height: 'calc(100vh - 5rem)' }}>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="p-6 rounded-lg bg-accent text-center">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

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
