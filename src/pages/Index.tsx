
import Header from "@/components/Header";
import UrlShortener from "@/components/UrlShortener";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="mb-8" />
      
      <main className="flex-1 container max-w-4xl px-4">
        <section className="text-center mb-12">
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
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>URL Shortener &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
