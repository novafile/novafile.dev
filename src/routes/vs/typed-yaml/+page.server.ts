import { highlightComparison } from '#lib/highlight/comparison.ts';
import { comparison } from '#lib/content/vs-typed-yaml.ts';

export const load = () => highlightComparison(comparison);
