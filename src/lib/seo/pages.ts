import { meta as home } from '#lib/content/home.ts';
import { meta as vsYaml } from '#lib/content/vs-yaml.ts';
import { comparison as vsJson } from '#lib/content/vs-json.ts';
import { comparison as vsJsonl } from '#lib/content/vs-jsonl.ts';
import { comparison as vsToon } from '#lib/content/vs-toon.ts';
import { comparison as vsTypedYaml } from '#lib/content/vs-typed-yaml.ts';
import { comparison as vsToml } from '#lib/content/vs-toml.ts';
import { comparison as vsHelm } from '#lib/content/vs-helm.ts';
import { comparison as vsKustomize } from '#lib/content/vs-kustomize.ts';
import { comparison as vsProtobuf } from '#lib/content/vs-protobuf.ts';
import { comparison as vsBinary } from '#lib/content/vs-binary.ts';

/** Title and description of each page, for llms.txt. Keyed by path, ending with a slash. */
const meta: Record<string, { title: string; description: string }> = {
	'/': home,
	'/vs/yaml/': vsYaml,
	[vsJson.path]: vsJson.meta,
	[vsJsonl.path]: vsJsonl.meta,
	[vsToon.path]: vsToon.meta,
	[vsTypedYaml.path]: vsTypedYaml.meta,
	[vsToml.path]: vsToml.meta,
	[vsHelm.path]: vsHelm.meta,
	[vsKustomize.path]: vsKustomize.meta,
	[vsProtobuf.path]: vsProtobuf.meta,
	[vsBinary.path]: vsBinary.meta
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
