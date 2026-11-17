import schemaJson from './samples/vs-typed-yaml/service.schema.json?raw';
import schemaNovs from './samples/vs-typed-yaml/service.novs?raw';
import serviceNova from './samples/vs-typed-yaml/service.nova?raw';
import validate from './samples/vs-typed-yaml/validate.txt?raw';
import migrateSh from './samples/vs-typed-yaml/migrate.sh?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/typed-yaml/',
	format: 'typed YAML',
	meta: {
		title: 'Typed YAML: block layout and comments, with schemas built in',
		description:
			'NOVA keeps YAML’s block layout and comments and adds a small schema language. A schema validates a document, reports every violation with its path, and turns strings such as timestamps into typed values.',
		lead: 'Typing YAML today means a JSON Schema next to the file and a validator that only says yes or no. NOVA keeps the block layout and the comments, and adds a schema language that is part of the format: it validates, reports every violation with its path, and gives values their types.'
	},
	stacked: true,
	before: {
		filename: 'service.schema.json',
		meta: 'JSON Schema for a YAML file',
		lang: 'json',
		code: schemaJson,
		notes: ['', '', '', '', '', '', '', 'still a string', '', '', '']
	},
	after: {
		filename: 'service.novs',
		meta: 'a NOVA schema',
		lang: 'nova-schema',
		code: schemaNovs,
		notes: [
			'name and SemVer version',
			'type of the document',
			'',
			'closed by default',
			'',
			'',
			'default',
			'a real timestamp'
		]
	},
	afterNote: {
		text: 'With the schema, `deployed_at: 2026-11-17T16:00:00Z` resolves to a timestamp. Without one it stays a string, as every bare word does.',
		section: '6.3',
		label: 'Schema-directed resolution, spec §6.3'
	},
	changes: [
		{
			topic: 'Schema language',
			theirs: 'JSON Schema, written in JSON or YAML',
			nova: 'A small `.novs` language with records, enums and aliases',
			section: '6.1'
		},
		{
			topic: 'Types from the schema',
			theirs: 'Validation only; a date stays a string',
			nova: 'Resolution turns strings into timestamps, durations, decimals and enums',
			section: '6.3'
		},
		{
			topic: 'Unknown fields',
			theirs: 'Allowed unless `additionalProperties: false`',
			nova: 'Rejected unless the record is `@open`',
			section: '6.1'
		},
		{
			topic: 'Errors',
			theirs: 'Depends on the validator',
			nova: 'Every violation, each with its path',
			section: '6.4'
		},
		{
			topic: 'Enums with data',
			theirs: '`oneOf` with a discriminator field',
			nova: '`enum Status = active | failed(string)`',
			section: '2.11'
		},
		{
			topic: 'Versions',
			theirs: 'A `$id` by convention',
			nova: 'SemVer, checked against the schema diff',
			section: '6.7'
		}
	],
	migrate: {
		intro:
			'Convert the data, import the JSON Schema you already have, then validate. The document can name its schema with `@schema`; parsers never fetch it.',
		steps: [
			{ lang: 'shellscript', code: migrateSh },
			{ filename: 'service.nova', meta: 'two mistakes', lang: 'nova', code: serviceNova },
			{ filename: 'All of them, at once', lang: 'text', code: validate }
		],
		note: {
			text: 'The language server shows the same diagnostics in the editor, using the schemas in your workspace.',
			section: '6.4',
			label: 'Validation, spec §6.4'
		}
	},
	stayTitle: 'When to stay with YAML and JSON Schema',
	stay: [
		'Your tool only reads YAML, such as Kubernetes or a CI system, and your editor already validates it against a JSON Schema. Keep YAML at that boundary and generate it with `nvf convert --to yaml`.',
		'You need a format that is stable today. NOVA is a 0.1 draft, and minor versions must match exactly while the major version is 0.'
	],
	faq: [
		{
			question: 'Do I need a schema to use NOVA?',
			answer:
				'No. Documents without a schema are complete on their own. A schema adds types, constraints, defaults and versioning when you want them.'
		},
		{
			question: 'Can I keep my JSON Schema?',
			answer:
				'`nvf schema from-json-schema` converts a JSON Schema (2020-12 or draft-07) into a NOVA schema, and `nvf schema json-schema` goes the other way for tools that expect one.'
		},
		{
			question: 'What is checked when a schema version changes?',
			answer:
				'`nvf schema check old.novs new.novs` classifies each change as compatible or breaking and fails if the version bump is too small, so `1.4.0` really can read `1.2.0` data.'
		}
	],
	related: [
		{ label: 'NOVA vs YAML', href: '/vs/yaml/' },
		{ label: 'NOVA vs Protobuf', href: '/vs/protobuf/' }
	]
};
