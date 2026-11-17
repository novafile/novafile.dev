import humanNova from './samples/human.nova?raw';
import compactNova from './samples/compact.nova?raw';
import schemaNovs from './samples/schema.novs?raw';
import queryNova from './samples/query.nova?raw';
import patchNovaPatch from './samples/patch.nova-patch?raw';
import templateNova from './samples/template.nova?raw';
import agentGetNova from './samples/agent-get.nova?raw';
import agentRevisionNova from './samples/agent-revision.nova?raw';
import agentPatchNovaPatch from './samples/agent-patch.nova-patch?raw';
import helmYaml from './samples/helm.yaml?raw';
import templateContainersNova from './samples/template-containers.nova?raw';
import type { CodeLang } from '#lib/highlight/index.ts';
import type { SpecSection } from './site';

/** Home page copy and samples. Every sample is taken from the spec or the reference README. */

export const meta = {
	title: 'NOVA: a typed data format for people, LLMs and agents',
	description:
		'NOVA (novafile) is a typed data serialization format with human text for people, compact tables for LLMs, canonical binary for services, and conditional patches for agents. A JSON, YAML and TOML alternative with schemas.'
};

export interface Representation {
	id: string;
	label: string;
	caption: string;
	section: SpecSection;
	sectionLabel: string;
	lang: CodeLang;
	/** A shell command shown above the output, without highlighting. */
	command?: string;
	code: string;
}

export const representations: Representation[] = [
	{
		id: 'human',
		label: 'Human text',
		caption: 'Block layout and comments, for people editing configuration.',
		section: '4',
		sectionLabel: 'Text syntax, §4',
		lang: 'nova',
		code: humanNova
	},
	{
		id: 'compact',
		label: 'Compact',
		caption: 'The same list as a table for LLM context. The row count is checked.',
		section: '4.9',
		sectionLabel: 'Tables, §4.9',
		lang: 'nova',
		code: compactNova
	},
	{
		id: 'schema',
		label: 'Schema',
		caption: 'Keys, field numbers, ranges and enums with payloads, in a .novs file.',
		section: '6',
		sectionLabel: 'Schemas, §6',
		lang: 'nova-schema',
		code: schemaNovs
	},
	{
		id: 'query',
		label: 'Query',
		caption: 'Read only the fields you need, with the revision they came from.',
		section: '7.3',
		sectionLabel: 'Queries, §7.3',
		lang: 'nova',
		command: `nvf get infrastructure.nova 'services[id=api].{replicas,port}'`,
		code: queryNova
	},
	{
		id: 'patch',
		label: 'Patch',
		caption: 'Change one value, conditional on its old value and the base revision.',
		section: '7.4',
		sectionLabel: 'Patches, §7.4',
		lang: 'nova-patch',
		code: patchNovaPatch
	},
	{
		id: 'template',
		label: 'Template',
		caption: 'Typed, total templates that render to plain values.',
		section: '9',
		sectionLabel: 'Templates, §9',
		lang: 'nova',
		code: templateNova
	}
];

export interface FormatEntry {
	name: string;
	summary: string;
	href?: string;
}

export const formats: FormatEntry[] = [
	{
		name: 'JSON',
		summary:
			'Comments, timestamps and exact decimals. Duplicate keys are an error, not a coin toss.'
	},
	{
		name: 'JSON Lines',
		summary: 'Name the columns once. A declared row count turns truncated output into an error.'
	},
	{
		name: 'YAML',
		summary: '`no` stays a string. Indentation is exactly two spaces, never a guess.',
		href: '/vs/yaml/'
	},
	{
		name: 'YAML, but typed',
		summary: 'Keep the block layout and the comments you like. Add schemas and validation.'
	},
	{
		name: 'TOML',
		summary: 'Explicit types like TOML, nesting like YAML. No arrays-of-tables gymnastics.'
	},
	{
		name: 'Helm',
		summary: 'Templates over values, not text. Typed parameters, no `nindent`, always terminates.'
	},
	{
		name: 'Kustomize',
		summary: 'Overlays are conditional patches that say what they expect: `replicas: 5 -> 8`.'
	},
	{
		name: 'Protocol Buffers',
		summary:
			'One schema for text and wire. `@id` is the field number, and the `.proto` is generated.'
	},
	{
		name: "Cap'n Proto, CBOR, MessagePack",
		summary:
			'A self-describing binary with one canonical encoding, so every value has a SHA-256 revision.'
	}
];

export const agentSteps: { title: string; lang: CodeLang; code: string }[] = [
	{ title: 'The agent asks', lang: 'nova', code: agentGetNova },
	{
		title: 'The tool answers with a revision',
		lang: 'nova',
		code: agentRevisionNova
	},
	{
		title: 'The agent writes one line',
		lang: 'nova-patch',
		code: agentPatchNovaPatch
	}
];

export const helmSample = {
	lang: 'yaml' as CodeLang,
	code: helmYaml
};

export const templateSample = {
	lang: 'nova' as CodeLang,
	code: templateContainersNova
};

export const tools = [
	{
		name: 'nvf',
		description:
			'The command line: format, convert, validate, query, patch, diff, render and lint.',
		detail: 'fmt · convert · get · patch · diff · render · lint · stats'
	},
	{
		name: 'nvf-lsp',
		description:
			'Language server: diagnostics with workspace schemas, hover, outline, completion, formatting.'
	},
	{
		name: 'VS Code',
		description:
			'Highlighting for documents, schemas and patches, plus the language server client.',
		href: 'https://github.com/novafile/vscode-novafile'
	},
	{
		name: 'tree-sitter',
		description: 'One grammar for Helix, Neovim, Zed and other tree-sitter editors.',
		href: 'https://github.com/novafile/tree-sitter-nova'
	}
];

export const ecosystem: { label: string; status: 'available' | 'planned' }[] = [
	{ label: 'Rust', status: 'available' },
	{ label: 'JVM', status: 'planned' },
	{ label: 'npm', status: 'planned' },
	{ label: 'Go', status: 'planned' },
	{ label: 'Zig', status: 'planned' },
	{ label: 'Python', status: 'planned' }
];
