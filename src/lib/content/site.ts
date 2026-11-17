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
	'2.10': '210-records',
	'4': '4-text-syntax',
	'4.3': '43-block-structure',
	'4.4': '44-plain-scalars-and-token-classification',
	'4.9': '49-tables',
	'6': '6-schemas',
	'7.3': '73-queries',
	'7.4': '74-patch-documents',
	'8': '8-the-agent-interaction-model',
	'9': '9-templates-and-composition',
	'11.2': '112-other-formats'
} as const;

export type SpecSection = keyof typeof specAnchors;

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
	{ label: 'Compare', href: '/vs/yaml/' },
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
		links: [{ label: 'NOVA vs YAML', href: '/vs/yaml/' }]
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
