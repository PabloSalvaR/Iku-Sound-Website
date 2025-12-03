// Cloudflare Worker that serves the Vite build and falls back to index.html for SPA routes.
export default {
  async fetch(request, env) {
    try {
      const { pathname } = new URL(request.url);
      if (!env.ASSETS || typeof env.ASSETS.fetch !== 'function') {
        throw new Error('ASSETS binding is not available. Deploy with --assets dist.');
      }

      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404 || request.method !== 'GET') {
        return assetResponse;
      }

      if (!shouldFallbackToIndex(pathname)) {
        return assetResponse;
      }

      const indexRequest = new Request(new URL('/index.html', request.url), request);
      return env.ASSETS.fetch(indexRequest);
    } catch (error) {
      const message = error instanceof Error ? `${error.name}: ${error.message}` : 'Unknown error';
      console.error('Worker unhandled error:', error);
      return new Response(`Internal Error\n${message}`, { status: 500 });
    }
  }
};

function shouldFallbackToIndex(pathname) {
  return !pathname.includes('.') && !pathname.startsWith('/cdn-cgi/');
}
