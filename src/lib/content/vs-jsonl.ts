import servicesJsonl from './samples/vs-jsonl/services.jsonl?raw';
import servicesNova from './samples/vs-jsonl/services.nova?raw';
import migrateSh from './samples/vs-jsonl/migrate.sh?raw';
import compactNova from './samples/vs-jsonl/compact.nova?raw';
import truncated from './samples/vs-jsonl/truncated.txt?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/jsonl/',
	format: 'JSON Lines',
	meta: {
		title: 'A JSON Lines alternative that names the columns once',
		description:
			'A NOVA table names its columns once and declares its row count, so truncated output from an LLM or a pipe is an error instead of a shorter list. NOVA reads JSON Lines directly.',
		lead: 'JSON Lines repeats every key on every line, and a stream that was cut short is still a valid, shorter stream. A NOVA table names the columns once and declares how many rows follow, so a missing row is an error.'
	},
	variant: 'problem-fix',
	stacked: true,
	before: {
		filename: 'services.jsonl',
		meta: 'the third line never arrived',
		lang: 'jsonl',
		code: servicesJsonl,
		notes: ['keys again', 'keys again']
	},
	after: {
		filename: 'services.nova',
		meta: 'the same rows as a table',
		lang: 'nova',
		code: servicesNova,
		notes: ['3 rows promised', '', 'row 3 missing: error']
	},
	afterNote: {
		text: 'A missing or extra row fails the parse, which catches output that an LLM or a pipe cut short.',
		section: '4.9',
		label: 'Tables, spec §4.9'
	},
	changes: [
		{
			topic: 'Field names',
			theirs: 'Repeated on every line',
			nova: 'Once, in the table header',
			section: '4.9'
		},
		{
			topic: 'Truncation',
			theirs: 'A shorter file is still valid',
			nova: '`[N]` is the exact row count; a missing row is an error',
			section: '4.9'
		},
		{
			topic: 'Absent fields',
			theirs: 'Leave the key out',
			nova: 'Leave the cell empty; write `null` for a present null',
			section: '4.9'
		},
		{
			topic: 'Types',
			theirs: 'JSON’s six kinds',
			nova: 'Any NOVA value in a cell: timestamps, decimals, variants',
			section: '2'
		},
		{
			topic: 'Appending',
			theirs: 'One value per line, append with `>>`',
			nova: 'Documents separated by `---`; a line-oriented stream format is proposed',
			section: '4.11'
		},
		{
			topic: 'Querying',
			theirs: '`jq` per line',
			nova: '`nvf get` reads JSON Lines as a list and answers with a table',
			section: '7.3'
		}
	],
	migrate: {
		intro:
			'JSON Lines reads as a list of its lines. The compact profile writes a list of records with scalar fields as a table, with the row count filled in.',
		steps: [
			{ lang: 'shellscript', code: migrateSh },
			{ filename: 'stdout', lang: 'nova', code: compactNova },
			{ filename: 'A cut-off table', lang: 'text', code: truncated }
		]
	},
	stayTitle: 'When to stay with JSON Lines',
	stay: [
		'You append to a log while it is being written. A table needs its row count up front. NOVA Lines, a line-oriented stream with an optional `@end` count, is only a proposal so far.',
		'Your records are irregular or deeply nested. Tables pay off on uniform records and lose their advantage on irregular data.',
		'You need a format that is stable today. NOVA is a 0.1 draft.'
	],
	faq: [
		{
			question: 'Does NOVA have a streaming format like JSON Lines?',
			answer:
				'Not yet. Today a text stream is a sequence of documents separated by `---` lines. NOVA Lines (`.novl`) is proposed: one value or table row per line, with an optional `@end` trailer that carries the record count.'
		},
		{
			question: 'Can a cell hold a nested value?',
			answer:
				'Yes. A cell is any flow value, such as `[a, b]` or `{x: 1}`. The compact writer only chooses a table when the fields are scalars and the rows are at least half filled.'
		},
		{
			question: 'Are commas inside values a problem?',
			answer:
				'No. Rows are never split on raw commas: a cell with a comma is quoted, like any other string that needs it.'
		}
	],
	related: [
		{ label: 'NOVA vs JSON', href: '/vs/json/' },
		{ label: 'NOVA and TOON', href: '/vs/toon/' }
	]
};
