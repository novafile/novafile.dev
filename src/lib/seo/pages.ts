import { meta as home } from '#lib/content/home.ts';
import { meta as vsYaml } from '#lib/content/vs-yaml.ts';

/** Every page on the site, for the sitemap and llms.txt. Paths end with a slash. */
export const pages: { path: string; title: string; description: string }[] = [
	{ path: '/', ...home },
	{ path: '/vs/yaml/', ...vsYaml }
];
