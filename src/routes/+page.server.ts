import { highlight, highlightAll } from '#lib/highlight/index.ts';
import { agentSteps, helmSample, representations, templateSample } from '#lib/content/home.ts';
import { specUrl } from '#lib/content/site.ts';

export async function load() {
	const items = await highlightAll(representations);
	return {
		representations: items.map((item) => ({ ...item, sectionHref: specUrl(item.section) })),
		agentSteps: await highlightAll(agentSteps),
		helm: { ...helmSample, html: await highlight(helmSample.code, helmSample.lang) },
		template: { ...templateSample, html: await highlight(templateSample.code, templateSample.lang) }
	};
}
