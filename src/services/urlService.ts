
interface ShortenResponse {
  success: boolean;
  shortUrl?: string;
  error?: string;
}

export async function shortenUrl(url: string): Promise<ShortenResponse> {
  try {
    // Using a free URL shortener API
    const response = await fetch('https://api.shrtco.de/v2/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.ok) {
      return {
        success: true,
        shortUrl: data.result.full_short_link,
      };
    } else {
      return {
        success: false,
        error: data.error || 'Failed to shorten URL',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error occurred',
    };
  }
}
