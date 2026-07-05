import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import UrlList from "@/components/UrlList";
import UrlListPagination from "@/components/UrlListPagination";
import { Button } from "@/components/ui/button";
import { urlService, UrlItem } from "@/services/api/urlApi";
import { toast } from "sonner";

const DEFAULT_PAGE_SIZE = 15;

const MyUrls = () => {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUrls = async () => {
      setIsLoading(true);
      try {
        const response = await urlService.getUserUrls(page - 1, pageSize);
        if (response.err) {
          toast.error(response.err.errorMessage || response.m || 'Failed to fetch your URLs');
        }
        setUrls(response.lc?.content || []);
        setTotalElements(response.lc?.totalElements || 0);
        setTotalPages(response.lc?.totalPages || 0);
      } catch {
        toast.error('Failed to fetch your URLs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUrls();
  }, [page, pageSize]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return (
    <main
      className="flex flex-col w-full px-4 md:px-8 py-6 overflow-hidden"
      style={{ height: 'calc(100vh - 5rem)' }}
    >
      <section className="shrink-0 flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">My URLs</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {totalElements} total {totalElements === 1 ? 'URL' : 'URLs'}
          </p>
        </div>
        <Button asChild>
          <Link to="/">
            <Plus className="h-4 w-4 mr-2" />
            Create URL
          </Link>
        </Button>
      </section>

      <div className="glass-card rounded-xl flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto p-8">
          <UrlList urls={urls} isLoading={isLoading} />
        </div>
      </div>

      <div className="shrink-0 mt-4">
        <UrlListPagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </main>
  );
};

export default MyUrls;
