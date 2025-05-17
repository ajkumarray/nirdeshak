interface ShortenResponse {
  success: boolean;
  shortUrl?: string;
  error?: string;
}

interface ShortenUrlRequest {
  url: string;
  expirationDays: number;
}

export async function shortenUrl(data: ShortenUrlRequest): Promise<ShortenResponse> {
  try {
    const response = await fetch('http://3.108.58.212:8080/api/v1/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        shortUrl: responseData.shortUrl,
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Failed to shorten URL',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error occurred',
    };
  }
}
