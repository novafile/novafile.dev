import eventsJsonl from './samples/vs-jsonl/events.jsonl?raw';
import eventsNovl from './samples/vs-jsonl/events.novl?raw';
import servicesNovl from './samples/vs-jsonl/services.novl?raw';
import migrateSh from './samples/vs-jsonl/migrate.sh?raw';
import compactNova from './samples/vs-jsonl/compact.nova?raw';
import truncated from './samples/vs-jsonl/truncated.txt?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/jsonl/',
	format: 'JSON Lines',
	meta: {
		title: 'NOVA vs JSON Lines: typed records, one per line',
		description:
			'NOVA reads JSON Lines today. NOVA Lines (.novl), a proposed line-oriented stream, keeps one record per line and the shape of JSON Lines, adds NOVA types, and can end with a record count so a reader can tell a finished stream from one that stopped. Flat rows can name their columns once.',
		lead: 'JSON Lines has only JSON’s types, and a reader cannot tell a finished stream from one that stopped early. NOVA reads JSON Lines today. NOVA Lines, a proposed stream format, keeps one record per line and the same keys, adds real types, and can end with a record count. Flat rows can also name their columns once.'
	},
	variant: 'problem-fix',
	stacked: true,
	before: {
		filename: 'events.jsonl',
		meta: 'did the writer finish?',
		lang: 'jsonl',
		code: eventsJsonl
	},
	after: {
		filename: 'events.novl',
		meta: 'proposed, not in the spec yet',
		lang: 'nova',
		code: eventsNovl
	},
	afterNote: {
		text: 'Proposed: the same shape and the same repeated keys as JSON Lines, but with real types: `ts` is a timestamp, `level` a variant. Records are appended one line at a time, and the optional `@end` trailer says the writer finished. A stream without it reads as open, not as complete, so `tail -f` still works.',
		section: 'C',
		label: 'Open questions, spec App. C'
	},
	changes: [
		{
			topic: 'Appending',
			theirs: 'One value per line, append with `>>`',
			nova: 'Proposed: one row or value per line in `.novl`; today, documents separated by `---`',
			section: '4.11'
		},
		{
			topic: 'Field names',
			theirs: 'Repeated on every line',
			nova: 'Repeated too; proposed: flat rows name them once in an `@columns` header',
			section: 'C'
		},
		{
			topic: 'Truncation',
			theirs: 'A shorter stream is still valid',
			nova: 'Proposed: `@end <count>` closes the stream; without it the stream is open',
			section: 'C'
		},
		{
			topic: 'Types',
			theirs: 'JSON’s six kinds',
			nova: 'Any NOVA value: timestamps, decimals, sets, variants',
			section: '2'
		},
		{
			topic: 'Absent fields',
			theirs: 'Leave the key out',
			nova: 'Leave the key out, or the cell empty in a table; `null` is a present null',
			section: '4.9'
		},
		{
			topic: 'Querying',
			theirs: '`jq` per line',
			nova: '`nvf get` reads JSON Lines as one list and answers in the compact profile',
			section: '7.3'
		}
	],
	migrate: {
		intro:
			'Today NOVA reads JSON Lines as one list. For a finished file of flat records, the compact profile writes a table with the row count filled in, so a cut-off copy fails to parse; nested records stay records. Writing `.novl` is part of the proposal; `nvf` does not do it yet. For flat rows it adds `@columns`, which names the top-level keys once.',
		steps: [
			{ lang: 'shellscript', code: migrateSh },
			{ filename: 'stdout', lang: 'nova', code: compactNova },
			{ filename: 'A cut-off table', lang: 'text', code: truncated },
			{
				filename: 'Proposed: flat rows in .novl, columns named once',
				lang: 'nova',
				code: servicesNovl
			}
		]
	},
	stayTitle: 'When to stay with JSON Lines',
	stay: [
		'You append to a log while it is being written and need a format that is specified today. NOVA Lines is only a proposal so far.',
		'Every tool in your pipeline already speaks JSON Lines, and you do not need types beyond JSON’s.',
		'You need a format that is stable today. NOVA is a 0.1 draft.'
	],
	faq: [
		{
			question: 'Does NOVA have a streaming format like JSON Lines?',
			answer:
				'Not yet. Today a text stream is a sequence of documents separated by `---` lines. NOVA Lines (`.novl`) is proposed: one flow value or table row per line, an optional header with `@columns`, and an optional `@end` trailer with the record count.'
		},
		{
			question: 'How would a reader notice a stream that was cut short?',
			answer:
				'In the proposal, a writer that finishes ends with `@end <count>`. A reader that finds it checks the count; one that reaches the end without it reports the stream as open rather than complete. For output that is already finished, a NOVA table with `[N]` rows works today.'
		},
		{
			question: 'Can a record hold nested values?',
			answer:
				'Yes. For nested events such as logs, value mode is the format: each line is one flow value, as in the example above. `@columns` is an optimisation for flat rows and saves only the top-level keys; nested keys repeat on every line in both modes. Today the compact writer only chooses a table when every field is a scalar.'
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
