import { highlight } from '#lib/highlight/index.ts';
import { migrate, novaSide, yamlSide } from '#lib/content/vs-yaml.ts';

export async function load() {
	return {
		yaml: { ...yamlSide, html: await highlight(yamlSide.code, yamlSide.lang) },
		nova: { ...novaSide, html: await highlight(novaSide.code, novaSide.lang) },
		migrate: { ...migrate, html: await highlight(migrate.code, migrate.lang) }
	};
}
