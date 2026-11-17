import promptToon from './samples/vs-toon/prompt.toon?raw';
import responseNova from './samples/vs-toon/response.nova?raw';
import getSh from './samples/vs-toon/get.sh?raw';
import patchNova from './samples/vs-toon/patch.nova-patch?raw';
import stats from './samples/vs-toon/stats.txt?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/toon/',
	format: 'TOON',
	meta: {
		title: 'NOVA and TOON: the same tables, in a typed format',
		description:
			'NOVA borrows TOON’s tables with declared columns and row counts. TOON encodes JSON for LLM prompts; NOVA uses the same tables inside a typed format, so an agent reads a projection with its revision and answers with a conditional patch.',
		lead: 'NOVA’s tables come from TOON: name the columns once and declare the row count. TOON is an encoding of JSON for LLM prompts. In NOVA the table is one representation of a typed document, so the model can read it with a revision and write back a conditional patch.'
	},
	stacked: true,
	before: {
		filename: 'prompt.toon',
		meta: 'JSON, encoded for a prompt',
		lang: 'text',
		code: promptToon,
		notes: ['columns and row count', '', '']
	},
	after: {
		filename: 'nvf get',
		meta: 'a NOVA query response',
		lang: 'nova',
		code: responseNova,
		notes: ['patch against this', 'the same header', '', '']
	},
	afterNote: {
		text: 'Query responses use the compact profile, so a projected list of uniform records comes back as a table, with the revision of the whole document.',
		section: '7.3',
		label: 'Queries, spec §7.3'
	},
	changes: [
		{
			topic: 'What it is',
			theirs: 'An encoding of JSON for LLM input; keep JSON elsewhere',
			nova: 'One value model with human text, compact tables, binary and patches',
			section: '3'
		},
		{
			topic: 'Types',
			theirs: 'JSON’s: objects, arrays, strings, numbers, booleans, null',
			nova: 'Also timestamps, decimals, rationals, sets, tuples and variants',
			section: '2'
		},
		{
			topic: 'Row count',
			theirs: 'Required; checked in strict mode, the default',
			nova: 'Required; always checked',
			section: '4.9'
		},
		{
			topic: 'Delimiters',
			theirs: 'Comma, tab or pipe',
			nova: 'Comma; a cell is a flow value, quoted when needed',
			section: '4.9'
		},
		{
			topic: 'Comments',
			theirs: 'Full-line `#`, dropped when decoding',
			nova: 'Full-line and trailing, kept by the formatter and by patches',
			section: '4.1'
		},
		{
			topic: 'Writing back',
			theirs: 'The model writes TOON or JSON; you decode it',
			nova: 'The model writes a conditional patch against the revision',
			section: '8'
		}
	],
	migrate: {
		intro:
			'You do not need a prompt encoder: ask for the fields the model needs, and the answer is already a table. The model then answers with one line instead of the whole document.',
		steps: [
			{ lang: 'shellscript', code: getSh },
			{ filename: 'What the model writes back', lang: 'nova-patch', code: patchNova },
			{ filename: 'Compare the sizes of your own file', lang: 'text', code: stats }
		],
		note: {
			text: 'Fewer input tokens do not always mean fewer total tokens or more correct results. Measure with your model’s tokenizer and your tasks.',
			section: '10',
			label: 'Token-aware selection, spec §10'
		}
	},
	stayTitle: 'When to stay with TOON',
	stay: [
		'Your data is JSON end to end and you only want a smaller prompt. That is what TOON is built for, and it has implementations in many languages.',
		'You want tab or pipe delimiters, or a configurable indentation size.',
		'You need a format that is stable today. NOVA is a 0.1 draft.'
	],
	faq: [
		{
			question: 'Is NOVA compact text the same as TOON?',
			answer:
				'No. The table header is the same idea, `key[N]{columns}:`, but the cells are NOVA flow values and the rest of the document is NOVA text. Do not expect a TOON decoder to read NOVA, or the other way round.'
		},
		{
			question: 'When does NOVA write a table?',
			answer:
				'The compact profile writes a list as a table when it has at least two records, every field value is a scalar, and the rows are at least half filled. Irregular data stays in block layout, where tables have no advantage.'
		},
		{
			question: 'What does an empty cell mean?',
			answer:
				'The field is absent from that row’s record. Write `null` for a field that is present and null.'
		}
	],
	related: [
		{ label: 'NOVA vs JSON Lines', href: '/vs/jsonl/' },
		{ label: 'Agents on the home page', href: '/#agents' }
	]
};
