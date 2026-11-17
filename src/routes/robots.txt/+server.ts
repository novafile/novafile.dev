import { site } from '#lib/content/site.ts';

export const prerender = true;
export const trailingSlash = 'never';

// Every page is public. Crawlers for search and AI assistants are named so the
// intent is explicit: the more tools know NOVA, the easier it is to adopt.
const agents = [
	'*',
	'Googlebot',
	'Bingbot',
	'Applebot',
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Google-Extended',
	'Applebot-Extended',
	'CCBot',
	'Meta-ExternalAgent',
	'Amazonbot',
	'DuckAssistBot',
	'MistralAI-User'
];

export function GET() {
	const body = [
		...agents.map((agent) => `User-agent: ${agent}`),
		'Allow: /',
		'',
		`Sitemap: ${site.url}/sitemap.xml`,
		''
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
