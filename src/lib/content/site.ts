/** Site-wide links and settings. Change spec links here once the spec is rendered on the site. */

export const site = {
	name: 'NOVA',
	domain: 'novafile.dev',
	url: 'https://novafile.dev',
	tagline: 'One data model. Every representation.',
	github: 'https://github.com/novafile',
	specRepo: 'https://github.com/novafile/spec',
	implementationRepo: 'https://github.com/novafile/nova',
	installCommand: 'cargo install novafile-cli'
} as const;

/** Sections of SPEC.md the site links to, keyed by section number. */
const specAnchors = {
	'2': '2-the-value-model',
	'2.1': '21-integers',
	'2.5': '25-numeric-kinds-are-distinct',
	'2.6': '26-timestamps',
	'2.10': '210-records',
	'2.11': '211-maps-and-variants',
	'2.12': '212-equality-and-ordering',
	'2.13': '213-revisions',
	'3': '3-representations-and-fidelity',
	'4': '4-text-syntax',
	'4.1': '41-encoding-and-lines',
	'4.3': '43-block-structure',
	'4.4': '44-plain-scalars-and-token-classification',
	'4.5': '45-numbers',
	'4.7': '47-flow-values',
	'4.8': '48-typed-literals',
	'4.9': '49-tables',
	'4.11': '411-text-streams',
	'5': '5-binary-encoding',
	'5.1': '51-value-encoding',
	'5.2': '52-canonical-encoding',
	'5.3': '53-string-payloads-and-back-references',
	'5.4': '54-frames',
	'6': '6-schemas',
	'6.1': '61-schema-language',
	'6.2': '62-key-and-selectors',
	'6.3': '63-schema-directed-resolution',
	'6.4': '64-validation',
	'6.5': '65-evolution',
	'6.7': '67-versioning',
	'7.3': '73-queries',
	'7.4': '74-patch-documents',
	'7.5': '75-patch-semantics',
	'7.6': '76-diffs',
	'8': '8-the-agent-interaction-model',
	'9': '9-templates-and-composition',
	'9.1': '91-motivation',
	'9.3': '93-constructs',
	'9.4': '94-evaluation',
	'9.5': '95-totality-and-limits',
	'9.6': '96-overlays',
	'10': '10-token-aware-representation-selection',
	'11.1': '111-json-and-json-lines',
	'11.2': '112-other-formats',
	C: 'appendix-c--open-questions-and-future-work'
} as const;

export type SpecSection = keyof typeof specAnchors;

/** A proposal in the spec repository, by file name. Proposals are not normative. */
export function proposalUrl(file: string): string {
	return `${site.specRepo}/blob/main/proposals/${file}`;
}

/** Every comparison page, in the order the home page lists them. */
export const comparisons = [
	{ name: 'JSON', href: '/vs/json/' },
	{ name: 'JSON Lines', href: '/vs/jsonl/' },
	{ name: 'TOON', href: '/vs/toon/' },
	{ name: 'YAML', href: '/vs/yaml/' },
	{ name: 'typed YAML', href: '/vs/typed-yaml/' },
	{ name: 'TOML', href: '/vs/toml/' },
	{ name: 'Helm', href: '/vs/helm/' },
	{ name: 'Kustomize', href: '/vs/kustomize/' },
	{ name: 'Protobuf', href: '/vs/protobuf/' },
	{ name: 'binary formats', href: '/vs/binary/' }
] as const;

export function specUrl(section?: SpecSection): string {
	const base = `${site.specRepo}/blob/main/SPEC.md`;
	return section ? `${base}#${specAnchors[section]}` : base;
}

export interface NavItem {
	label: string;
	href: string;
	external?: boolean;
}

export const mainNav: NavItem[] = [
	{ label: 'Spec', href: specUrl(), external: true },
	{ label: 'Compare', href: '/#coming-from' },
	{ label: 'Tools', href: '/#tools' },
	{ label: 'Ecosystem', href: '/#ecosystem' }
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
	{
		title: 'Reference',
		links: [
			{ label: 'Specification', href: specUrl(), external: true },
			{ label: 'Proposals', href: `${site.specRepo}/tree/main/proposals`, external: true },
			{ label: 'Conformance suite', href: `${site.specRepo}/tree/main/conformance`, external: true }
		]
	},
	{
		title: 'Compare',
		links: comparisons.map((c) => ({ label: `NOVA vs ${c.name}`, href: c.href }))
	},
	{
		title: 'Code',
		links: [
			{ label: 'Reference implementation', href: site.implementationRepo, external: true },
			{
				label: 'VS Code extension',
				href: 'https://github.com/novafile/vscode-novafile',
				external: true
			},
			{
				label: 'tree-sitter grammar',
				href: 'https://github.com/novafile/tree-sitter-nova',
				external: true
			}
		]
	}
];
