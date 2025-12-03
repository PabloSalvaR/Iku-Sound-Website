// Cloudflare Worker that serves the Vite build and falls back to index.html for SPA routes.
export default {
  async fetch(request, env) {
    try {
      if (!env.ASSETS || typeof env.ASSETS.fetch !== 'function') {
        throw new Error('ASSETS binding is not available. Deploy with --assets dist.');
      }

      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404 || request.method !== 'GET') {
        return assetResponse;
      }

      if (!shouldFallbackToIndex(new URL(request.url).pathname)) {
        return assetResponse;
      }

      const indexUrl = new URL('/index.html', request.url);
      const indexRequest = new Request(indexUrl.toString(), {
        method: 'GET',
        headers: request.headers
      });

      return env.ASSETS.fetch(indexRequest);
    } catch (error) {
      console.error('Worker unhandled error:', error);
      return new Response('Internal Error', { status: 500 });
    }
  }
};

function shouldFallbackToIndex(pathname) {
  return !pathname.includes('.') && !pathname.startsWith('/cdn-cgi/');
}
