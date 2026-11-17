import replicasPatch from './samples/vs-kustomize/replicas-patch.yaml?raw';
import prodPatch from './samples/vs-kustomize/prod.nova-patch?raw';
import migrateSh from './samples/vs-kustomize/migrate.sh?raw';
import conflict from './samples/vs-kustomize/conflict.txt?raw';
import diffSh from './samples/vs-kustomize/diff.sh?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/kustomize/',
	format: 'Kustomize',
	meta: {
		title: 'Kustomize-style overlays that say what they expect',
		description:
			'In NOVA an overlay is a conditional patch: each change can state the old value, the patch can pin the base revision and a scope, and it applies atomically or not at all.',
		lead: 'A Kustomize overlay states the new value and nothing about the old one, so it applies just as happily to a base that changed underneath it. In NOVA an overlay is a patch: `replicas: 5 -> 8` changes the value only if it is still 5.'
	},
	variant: 'problem-fix',
	stacked: true,
	before: {
		filename: 'Kustomize: the new value',
		meta: 'replicas-patch.yaml',
		lang: 'yaml',
		code: replicasPatch,
		notes: ['', '', '', '', '', 'was it 5? nobody checks']
	},
	after: {
		filename: 'NOVA: the change',
		meta: 'prod.nova-patch',
		lang: 'nova-patch',
		code: prodPatch,
		notes: ['only this base', 'only inside api', 'only if it is 5', 'only if enabled']
	},
	afterNote: {
		text: 'If any line fails, nothing is applied, and the error names the line with the expected and the actual value.',
		section: '7.5',
		label: 'Patch semantics, spec §7.5'
	},
	changes: [
		{
			topic: 'Preconditions',
			theirs: 'None; the overlay value wins',
			nova: '`old -> new` replaces only the expected value; `?` tests without changing',
			section: '7.5'
		},
		{
			topic: 'Base drift',
			theirs: 'The overlay applies to whatever the base is now',
			nova: 'An optional base revision; a changed base is a conflict',
			section: '7.5'
		},
		{
			topic: 'Scope',
			theirs: 'A target by kind and name',
			nova: '`@scope` limits every operation to one subtree',
			section: '7.4'
		},
		{
			topic: 'List items',
			theirs: 'Merge keys per resource type, or JSON Patch indexes',
			nova: 'Keyed selectors like `services[id=api]`, unique with `@key`',
			section: '6.2'
		},
		{
			topic: 'Validation',
			theirs: 'Later, by kubectl or the API server',
			nova: 'Against the schema, before the result is accepted',
			section: '7.5'
		},
		{
			topic: 'Writing overlays',
			theirs: 'By hand',
			nova: 'By hand, or `nvf diff` between two files',
			section: '7.6'
		}
	],
	migrate: {
		intro:
			'An overlay needs no new mechanism: render the base, then apply the patch. Comments and layout survive, because the patch edits the text in place.',
		steps: [
			{ lang: 'shellscript', code: migrateSh },
			{ filename: 'Someone changed the base to 6', lang: 'text', code: conflict },
			{ filename: 'Or let NOVA write the overlay', lang: 'shellscript', code: diffSh }
		],
		note: {
			text: 'Overlays get the same conditional operations, atomicity and validation as edits by agents.',
			section: '9.6',
			label: 'Overlays, spec §9.6'
		}
	},
	stayTitle: 'When to stay with Kustomize',
	stay: [
		'You need what Kustomize knows about Kubernetes: merge keys for each resource type, ConfigMap and Secret generators, name prefixes and labels. NOVA patches are generic and know none of it.',
		'Your pipeline runs `kubectl apply -k`. Kustomize is built into kubectl; NOVA is a separate tool.',
		'You need a format that is stable today. NOVA is a 0.1 draft.'
	],
	faq: [
		{
			question: 'What happens when an overlay no longer fits the base?',
			answer:
				'The patch is rejected as a whole and the base is unchanged. The error names the failing operation by index and line, with the expected and the actual value, or reports a stale base revision.'
		},
		{
			question: 'Does `nvf diff` produce conditional patches?',
			answer:
				'Yes. Every change it emits is `old -> new` or `- path: old`, and the patch carries the base revision. List items are matched by a unique `id`, `key` or `name` field when possible.'
		},
		{
			question: 'Can I patch YAML files?',
			answer:
				'Convert them first. Patches apply to NOVA documents, and `nvf convert` reads YAML, JSON and TOML.'
		}
	],
	related: [
		{ label: 'NOVA vs Helm', href: '/vs/helm/' },
		{ label: 'Agents on the home page', href: '/#agents' }
	]
};
