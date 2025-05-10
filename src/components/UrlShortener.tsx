
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { shortenUrl } from '@/services/urlService';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (value: string) => {
    // Basic URL validation
    try {
      new URL(value);
      setIsValidUrl(true);
      return true;
    } catch {
      if (value) {
        setIsValidUrl(false);
      } else {
        setIsValidUrl(true);
      }
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    validateUrl(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setShortUrl(null);

    try {
      const response = await shortenUrl(url);
      
      if (response.success && response.shortUrl) {
        setShortUrl(response.shortUrl);
        toast.success('URL shortened successfully!');
      } else {
        toast.error(response.error || 'Failed to shorten URL');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast.success('URL copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter your long URL here"
            value={url}
            onChange={handleUrlChange}
            className={`w-full p-3 ${!isValidUrl ? 'border-red-500' : ''}`}
            disabled={isLoading}
          />
          {!isValidUrl && (
            <p className="text-red-500 text-sm">Please enter a valid URL</p>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !url}
          className="w-full bg-brand hover:bg-brand-dark transition-colors"
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </Button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 rounded-lg bg-accent animate-fade-in">
          <div className="flex items-center justify-between">
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-dark font-medium hover:underline truncate mr-2"
            >
              {shortUrl}
            </a>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={copyToClipboard}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
