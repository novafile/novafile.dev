import configToml from './samples/vs-toml/config.toml?raw';
import configNova from './samples/vs-toml/config.nova?raw';
import migrateSh from './samples/vs-toml/migrate.sh?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/toml/',
	format: 'TOML',
	meta: {
		title: 'A TOML alternative for nested configuration',
		description:
			'NOVA keeps TOML’s explicit, predictable types and writes nesting as indentation instead of dotted table headers and arrays of tables. It also has null, exact decimals and a schema language.',
		lead: 'TOML is explicit about types, which is why people like it. Nesting is where it gets awkward: every level is a dotted header, and a list of records is a run of `[[arrays.of.tables]]`. NOVA keeps the explicit types and writes nesting as indentation.'
	},
	before: {
		filename: 'config.toml',
		meta: 'nesting by header',
		lang: 'toml',
		code: configToml,
		notes: ['service 1', '', '', '', 'inside service 1', '', '', 'service 2', '', '']
	},
	after: {
		filename: 'config.nova',
		meta: 'nesting by indentation',
		lang: 'nova',
		code: configNova,
		notes: ['', 'service 1', '', '', 'inside service 1', 'service 2', '']
	},
	afterNote: {
		text: 'Children are indented exactly two spaces. Any other indentation is an error, not a different structure.',
		section: '4.3',
		label: 'Block structure, spec §4.3'
	},
	changes: [
		{
			topic: 'Nesting',
			theirs: 'Dotted table headers',
			nova: 'Indentation, exactly two spaces per level',
			section: '4.3'
		},
		{
			topic: 'Lists of records',
			theirs: 'Arrays of tables, `[[x]]`',
			nova: 'Block lists, or a table with a row count',
			section: '4.9'
		},
		{
			topic: 'Null',
			theirs: 'None; leave the key out',
			nova: '`null` is a value, distinct from an absent field',
			section: '2'
		},
		{
			topic: 'Integers',
			theirs: '64-bit, with hex, octal, binary and `_` separators',
			nova: 'Exact and arbitrary size; decimal digits only',
			section: '4.5'
		},
		{
			topic: 'Dates',
			theirs: 'Offset and local date-times, dates and times',
			nova: 'Timestamps are instants; the offset is not kept',
			section: '2.6'
		},
		{
			topic: 'Validation',
			theirs: 'External tools',
			nova: 'A built-in schema language',
			section: '6'
		}
	],
	migrate: {
		intro:
			'Convert in either direction. Going back to TOML works when the root is a record and nothing is `null`; a list of records becomes an array of tables again.',
		steps: [{ lang: 'shellscript', code: migrateSh }],
		note: {
			text: 'An offset date-time becomes a timestamp. Local dates and times become strings, because NOVA has no local kinds.',
			section: '11.2',
			label: 'TOML mapping, spec §11.2'
		}
	},
	stayTitle: 'When to stay with TOML',
	stay: [
		'Your tool reads TOML, such as Cargo or `pyproject.toml`. Keep TOML there.',
		'Your configuration is flat. With one or two levels, TOML’s headers cost little, and nothing has to be indented.',
		'You rely on local dates or times, such as an opening hour without a time zone. NOVA would read them as strings.'
	],
	faq: [
		{
			question: 'Does NOVA have inline tables?',
			answer:
				'Yes, as flow records: `{id: auth, port: 8080}`. Flow lists, tuples, sets and maps work the same way and may span lines inside the brackets.'
		},
		{
			question: 'Why go back to indentation?',
			answer:
				'Because it is fixed by the grammar. Children are indented exactly two spaces, tabs are not allowed in indentation, and anything else is an error.'
		},
		{
			question: 'Are bare words typed like in YAML?',
			answer:
				'No. A bare word is a string unless it is `true`, `false`, `null` or a strict number, so the explicitness you get from TOML stays.'
		}
	],
	related: [
		{ label: 'NOVA vs YAML', href: '/vs/yaml/' },
		{ label: 'Typed YAML', href: '/vs/typed-yaml/' }
	]
};
