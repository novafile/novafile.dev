import { highlightComparison } from '#lib/highlight/comparison.ts';
import { comparison } from '#lib/content/vs-binary.ts';

export const load = () => highlightComparison(comparison);
