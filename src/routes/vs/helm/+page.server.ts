import { highlightComparison } from '#lib/highlight/comparison.ts';
import { comparison } from '#lib/content/vs-helm.ts';

export const load = () => highlightComparison(comparison);
