import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { shortenUrl } from '@/services/urlService';
import { urlService } from '@/services/api/urlApi';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';

interface FormData {
  url: string;
  expirationDays: number;
}

const UrlShortener = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAuth();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setShortUrl(null);

    try {
      const response = await urlService.shortenUrl({
        url: data.url,
        expirationDays: Number(data.expirationDays),
        status: "ACTIVE"
      }, isAuthenticated);

      console.log("url shortener response from tsx", response);
      // if (response.success && response.shortUrl) {
      setShortUrl(response.lc.shortUrl);
      //   toast.success('URL shortened successfully!');
      // } else {
      //   toast.error(response.error || 'Failed to shorten URL');
      // }
    } catch {
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
          <Input
            type="text"
            placeholder="Enter your long URL here"
            {...register('url', {
              required: true,
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Please enter a valid URL'
              }
            })}
            className={`w-full p-3 ${errors.url ? 'border-red-500' : ''}`}
            disabled={isLoading}
          />
          {errors.url && (
            <p className="text-red-500 text-sm">{errors.url.message || 'URL is required'}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="expirationDays" className="block text-sm font-medium text-gray-700">Expiration Days</label>
          <Input
            type="number"
            placeholder="Expiration days"
            {...register('expirationDays', {
              required: true,
              min: {
                value: 1,
                message: 'Expiration days must be at least 1'
              },
              max: {
                value: 365,
                message: 'Expiration days cannot exceed 365'
              }
            })}
            className={`w-full p-3 ${errors.expirationDays ? 'border-red-500' : ''}`}
            disabled={isLoading}
          />
          {errors.expirationDays && (
            <p className="text-red-500 text-sm">{errors.expirationDays.message || 'Expiration days is required'}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
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
