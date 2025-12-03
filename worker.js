// Cloudflare Workers entry point to serve SPA assets with a fallback.
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Try to serve the requested asset first.
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404 || request.method !== 'GET') {
      return assetResponse;
    }

    // If the path looks like an SPA route (no file extension), fall back to index.html.
    if (shouldFallbackToIndex(url.pathname)) {
      const indexRequest = new Request(new URL('/index.html', url), request);
      return env.ASSETS.fetch(indexRequest);
    }

    return assetResponse;
  }
};

function shouldFallbackToIndex(pathname) {
  // Ignore requests for actual files or Cloudflare internals like /cdn-cgi/.
  return !pathname.includes('.') && !pathname.startsWith('/cdn-cgi/');
}
