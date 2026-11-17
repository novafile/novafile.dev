import deploymentYaml from './samples/vs-helm/deployment.yaml?raw';
import deploymentTpl from './samples/vs-helm/deployment.tpl.nova?raw';
import renderSh from './samples/vs-helm/render.sh?raw';
import rejected from './samples/vs-helm/rejected.txt?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/helm/',
	format: 'Helm',
	meta: {
		title: 'Helm templates without text templating',
		description:
			'NOVA templates operate on values, not YAML text: typed parameters, no nindent or quote, no truthiness, and every render terminates within an output budget. Render to YAML for kubectl.',
		lead: 'Helm renders Go templates over YAML as text, so indentation is managed with `nindent` and quoting with `quote`. A NOVA template works on values: parameters are typed, there is no text to indent, and every render terminates.'
	},
	variant: 'problem-fix',
	stacked: true,
	before: {
		filename: 'Helm: templating text',
		meta: 'templates/deployment.yaml',
		lang: 'yaml',
		code: deploymentYaml,
		notes: ['', 'any type', '', '', '', 'count the spaces', 'truthy?', '', '', '']
	},
	after: {
		filename: 'NOVA: templating values',
		meta: 'deployment.tpl.nova',
		lang: 'nova',
		code: deploymentTpl,
		notes: [
			'',
			'checked range',
			'typed list',
			'must be a bool',
			'',
			'',
			'',
			'',
			'',
			'',
			'no indentation',
			''
		]
	},
	afterNote: {
		text: 'Templates are a separate kind of document. They render to a plain value before anything else reads it.',
		section: '9.1',
		label: 'Templates, spec §9.1'
	},
	changes: [
		{
			topic: 'What is templated',
			theirs: 'YAML text',
			nova: 'Values; indentation and escaping cannot go wrong',
			section: '9.1'
		},
		{
			topic: 'Parameters',
			theirs: '`values.yaml`, checked if you add `values.schema.json`',
			nova: '`@param` with a type, a range and a default',
			section: '9.4'
		},
		{
			topic: 'Conditions',
			theirs: 'Truthiness: `""`, `0` and empty lists are false',
			nova: 'A condition must be a bool; `$owner != null`, not `$owner`',
			section: '9.3'
		},
		{
			topic: 'Termination',
			theirs: 'Named templates can include themselves',
			nova: 'No recursion, no user functions, and an output budget',
			section: '9.5'
		},
		{
			topic: 'Functions',
			theirs: 'Sprig: strings, math, crypto, lookups',
			nova: 'References, interpolation, spreads, `@if` and `@for`; nothing else',
			section: '9.3'
		},
		{
			topic: 'Overrides',
			theirs: '`--set`, untyped',
			nova: '`--set`, resolved against the parameter’s type',
			section: '9.4'
		}
	],
	migrate: {
		intro:
			'There is no Helm converter: port a chart’s templates by hand, one file at a time. Render to YAML for anything that expects it.',
		steps: [
			{ lang: 'shellscript', code: renderSh },
			{ filename: 'A bad value never reaches the template', lang: 'text', code: rejected }
		],
		note: {
			text: '`Container` comes from the schema passed with `--schema`, which also validates the rendered document.',
			section: '9.4',
			label: 'Evaluation, spec §9.4'
		}
	},
	stayTitle: 'When to stay with Helm',
	stay: [
		'You use Helm for releases: chart repositories, upgrades, rollbacks and hooks. NOVA only replaces the templating, not the release management.',
		'Your templates compute: string functions, arithmetic or cluster lookups. NOVA templates have none of these, on purpose.',
		'You need a format that is stable today. NOVA is a 0.1 draft.'
	],
	faq: [
		{
			question: 'Can NOVA produce Kubernetes YAML?',
			answer:
				'Yes. `nvf render … --to yaml` writes YAML 1.2 and quotes every string that a YAML reader could take for another type.'
		},
		{
			question: 'Can a template blow up in size?',
			answer:
				'No. Renderers enforce an output budget, 10^6 value nodes by default, which stops "billion laughs" constructions. Imports are limited in depth and may not form cycles.'
		},
		{
			question: 'Can a template read files or the network?',
			answer:
				'Only through `@import`, which the host resolves. The reference loader accepts relative paths below the template’s directory and rejects URLs and `..`.'
		}
	],
	related: [
		{ label: 'NOVA vs Kustomize', href: '/vs/kustomize/' },
		{ label: 'NOVA vs YAML', href: '/vs/yaml/' }
	]
};
