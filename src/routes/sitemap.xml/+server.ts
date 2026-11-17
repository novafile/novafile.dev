import { site } from '#lib/content/site.ts';
import { routes } from '#lib/seo/pages.ts';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	const urls = routes
		.map((path) => `  <url><loc>${new URL(path, site.url).href}</loc></url>`)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
