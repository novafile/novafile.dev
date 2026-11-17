import type { CodeLang } from '#lib/highlight/index.ts';
import type { SpecSection } from './site';

/** Home page copy and samples. Every sample is taken from the spec or the reference README. */

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
		code: `@schema infrastructure@1.0.0

environment: production
deployed_at: 2026-11-17T16:00:00Z   # a string, until a schema resolves it
ratio: 22/7                         # an exact rational

services:
  - id: auth
    port: 8080
    replicas: 3
  - id: api
    port: 3000
    replicas: 5
`
	},
	{
		id: 'compact',
		label: 'Compact',
		caption: 'The same list as a table for LLM context. The row count is checked.',
		section: '4.9',
		sectionLabel: 'Tables, §4.9',
		lang: 'nova',
		code: `services[2]{id,port,replicas}:
  auth,8080,3
  api,3000,5
`
	},
	{
		id: 'schema',
		label: 'Schema',
		caption: 'Keys, field numbers, ranges and enums with payloads, in a .novs file.',
		section: '6',
		sectionLabel: 'Schemas, §6',
		lang: 'nova-schema',
		code: `@schema infrastructure@1.0.0
@root Infrastructure

type Port = u16 @range(1..65535)

record Service:
  id: string @key @id(1)
  port: Port @id(3)
  replicas: u16 @range(0..100) @id(4)

enum Status:
  active
  draining
  failed(string)
`
	},
	{
		id: 'query',
		label: 'Query',
		caption: 'Read only the fields you need, with the revision they came from.',
		section: '7.3',
		sectionLabel: 'Queries, §7.3',
		lang: 'nova',
		command: `nvf get infrastructure.nova 'services[id=api].{replicas,port}'`,
		code: `@revision sha256:91cf16db2f4a403ed7a586e82fc2618093f7c1d87fc0183e54ea1c9b936bd65b
@scope services[id=api]
replicas: 5
port: 3000
`
	},
	{
		id: 'patch',
		label: 'Patch',
		caption: 'Change one value, conditional on its old value and the base revision.',
		section: '7.4',
		sectionLabel: 'Patches, §7.4',
		lang: 'nova-patch',
		code: `@patch sha256:91cf16db
@scope services[id=api]
replicas: 5 -> 8
`
	},
	{
		id: 'template',
		label: 'Template',
		caption: 'Typed, total templates that render to plain values.',
		section: '9',
		sectionLabel: 'Templates, §9',
		lang: 'nova',
		code: `@template
@param env: string
@param services: list<string>
@param metrics: bool = false
@let defaults = {enabled: true, replicas: 2}

services:
  @for name in $services:
    - ...$defaults
      id: $name
      image: "ghcr.io/example/\${name}:v2"
  @if $metrics and $env == production:
    - id: metrics
`
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
	{ title: 'The agent asks', lang: 'nova', code: '@get services[id=api].{replicas,port}\n' },
	{
		title: 'The tool answers with a revision',
		lang: 'nova',
		code: `@revision sha256:91cf16db…
@scope services[id=api]
replicas: 5
port: 3000
`
	},
	{
		title: 'The agent writes one line',
		lang: 'nova-patch',
		code: `@patch sha256:91cf16db
@scope services[id=api]
replicas: 5 -> 8
`
	}
];

export const helmSample = {
	lang: 'yaml' as CodeLang,
	code: `spec:
  containers:
    {{- toYaml .Values.containers | nindent 4 }}
# get the 4 wrong and the YAML still parses
`
};

export const templateSample = {
	lang: 'nova' as CodeLang,
	code: `@template
@param containers: list<Container>

spec:
  containers: $containers
`
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
