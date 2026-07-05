import { useState } from 'react';
import { UrlItem } from '@/services/api/urlApi';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

interface UrlListProps {
  urls: UrlItem[];
  isLoading: boolean;
}

const statusVariant = (status: UrlItem['status']) => {
  switch (status) {
    case 'ACTIVE':
      return 'default' as const;
    case 'EXPIRED':
      return 'destructive' as const;
    default:
      return 'secondary' as const;
  }
};

const formatDate = (value?: string | null) => {
  if (!value) return '-';
  return new Date(value).toLocaleString();
};

const UrlList = ({ urls, isLoading }: UrlListProps) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (id: number, shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('URL copied to clipboard!');
    setCopiedId(id);
    setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1500);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        You haven't created any short URLs yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Original URL</TableHead>
            <TableHead className="whitespace-nowrap">Short URL</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Clicks</TableHead>
            <TableHead className="whitespace-nowrap">Created At</TableHead>
            <TableHead className="whitespace-nowrap">Expires At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="max-w-xs truncate" title={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {item.url}
                </a>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline truncate"
                  >
                    {item.shortUrl}
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(item.id, item.shortUrl)}
                    className="shrink-0"
                    aria-label="Copy short URL"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>{item.clickCount}</TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              <TableCell>{formatDate(item.expiresAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UrlList;
