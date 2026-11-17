import type { CodeLang } from '#lib/highlight/index.ts';
import type { SpecSection } from './site';

export const meta = {
	title: 'A YAML alternative without implicit typing',
	description:
		'NOVA keeps YAML’s block layout and comments, but a bare word is a string unless it is true, false, null or a strict number. No Norway problem, no octal surprises, exactly two spaces of indentation.',
	lead: 'A YAML 1.1 reader turns `no` into false and `0777` into 511, deciding types from how a word looks. NOVA keeps YAML’s block layout and comments. A bare word is a string unless it is `true`, `false`, `null` or a strict number.'
};

export const yamlSide = {
	filename: 'config.yaml',
	meta: 'what a YAML 1.1 reader sees',
	lang: 'yaml' as CodeLang,
	code: `country: no
mode: 0777
beta: on
services:
   - id: api
`,
	notes: ['false', '511', 'true', '', '3 spaces, still valid']
};

export const novaSide = {
	filename: 'config.nova',
	meta: 'what NOVA reads',
	lang: 'nova' as CodeLang,
	code: `country: no
mode: 0777
beta: true
services:
  - id: api
`,
	notes: ['"no"', '"0777"', 'true', '', 'exactly 2 spaces']
};

export const changes: { topic: string; yaml: string; nova: string; section: SpecSection }[] = [
	{
		topic: 'Bare words',
		yaml: 'Typed by pattern',
		nova: 'Strings, except `true`, `false`, `null` and numbers',
		section: '4.4'
	},
	{
		topic: 'Indentation',
		yaml: 'Any consistent amount',
		nova: 'Exactly two spaces per level',
		section: '4.3'
	},
	{
		topic: 'Duplicate keys',
		yaml: 'Often the last one wins',
		nova: 'Rejected by every parser',
		section: '2.10'
	},
	{
		topic: 'Reuse',
		yaml: 'Anchors, aliases and merge keys in the data',
		nova: 'Templates, rendered before anyone reads the data',
		section: '9'
	},
	{
		topic: 'Types',
		yaml: 'Tags, resolved per parser',
		nova: 'Timestamps, decimals, rationals, sets, tuples, variants',
		section: '2'
	},
	{
		topic: 'Validation',
		yaml: 'External schema tools',
		nova: 'Built-in schemas with SemVer-checked evolution',
		section: '6'
	}
];

export const migrate = {
	lang: 'shellscript' as CodeLang,
	code: `nvf convert config.yaml --to nova
nvf lint config.nova --fix
`
};

export const stayWithYaml = [
	'Your tool only reads YAML, such as Kubernetes or a CI system. Keep YAML at that boundary and generate it with `nvf convert --to yaml`.',
	'You need a format that is stable today. NOVA is a 0.1 draft, and minor versions must match exactly while the major version is 0.'
];

export const faq: { question: string; answer: string }[] = [
	{
		question: 'Is NOVA a superset of YAML?',
		answer:
			'No. It looks similar, but the rules differ on purpose. Existing files convert with `nvf convert`, which reports anything it cannot carry over.'
	},
	{
		question: 'Does NOVA keep my comments?',
		answer: 'Yes. Formatting and patching keep comments, blank lines and field order.'
	},
	{
		question: 'How do I write a date?',
		answer:
			'Write `@timestamp("2026-11-17T16:00:00Z")`, or leave it plain and let a schema field typed `timestamp` resolve it.'
	}
];

export const related = [{ label: 'NOVA on the home page', href: '/' }];
