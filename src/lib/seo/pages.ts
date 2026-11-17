import { meta as home } from '#lib/content/home.ts';
import { meta as vsYaml } from '#lib/content/vs-yaml.ts';

/** Title and description of each page, for llms.txt. Keyed by path, ending with a slash. */
const meta: Record<string, { title: string; description: string }> = {
	'/': home,
	'/vs/yaml/': vsYaml
};

/** Every page route, read from src/routes, so a new page reaches the sitemap without a list to update. */
export const routes = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
	.map((file) =>
		file.slice('/src/routes'.length, -'+page.svelte'.length).replace(/\/\([^)]+\)/g, '')
	)
	.sort();

/** Every page with its title and description. The build fails if a page has no entry in `meta`. */
export const pages = routes.map((path) => {
	if (!meta[path]) throw new Error(`No title and description for ${path} in src/lib/seo/pages.ts`);
	return { path, ...meta[path] };
});
