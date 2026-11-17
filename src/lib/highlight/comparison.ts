import type { Comparison } from '#lib/content/comparison.ts';
import { highlight } from './index';

/** Highlights every sample of a comparison page, for its `+page.server.ts`. */
export async function highlightComparison(c: Comparison) {
	const withHtml = async <T extends { code: string; lang: Comparison['before']['lang'] }>(
		s: T
	) => ({
		...s,
		html: await highlight(s.code, s.lang)
	});
	return {
		before: await withHtml(c.before),
		after: await withHtml(c.after),
		migrate: await Promise.all(c.migrate.steps.map(withHtml))
	};
}
