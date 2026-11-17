import orderJson from './samples/vs-json/order.json?raw';
import orderNova from './samples/vs-json/order.nova?raw';
import duplicate from './samples/vs-json/duplicate.txt?raw';
import migrateSh from './samples/vs-json/migrate.sh?raw';
import toJson from './samples/vs-json/to-json.txt?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/json/',
	format: 'JSON',
	meta: {
		title: 'A JSON alternative with comments, timestamps and exact decimals',
		description:
			'NOVA reads JSON as it is and adds comments, timestamps, durations, exact decimals and rationals. Duplicate keys are rejected by every parser instead of being resolved differently by each one.',
		lead: 'JSON has one number type, no dates and no comments, and leaves duplicate keys to the parser. NOVA reads JSON as it is, adds those types, and rejects a duplicate key everywhere.'
	},
	stacked: true,
	before: {
		filename: 'order.json',
		meta: 'what a JSON reader may do',
		lang: 'json',
		code: orderJson,
		notes: [
			'',
			'rounded in JavaScript',
			'a binary float',
			'just a string',
			'dropped?',
			'or kept?',
			''
		]
	},
	after: {
		filename: 'order.nova',
		meta: 'what NOVA reads',
		lang: 'nova',
		code: orderNova,
		notes: ['', 'exact integer', 'exact decimal', 'timestamp', 'one key']
	},
	afterNote: {
		text: 'The JSON file on the left does not convert: `nvf` stops at the second `"role"` and says where it is.',
		section: '2.10',
		label: 'Records, spec §2.10'
	},
	changes: [
		{
			topic: 'Comments',
			theirs: 'None',
			nova: '`#` comments, kept by the formatter and by patches',
			section: '4.1'
		},
		{
			topic: 'Numbers',
			theirs: 'One number type; precision depends on the reader',
			nova: '`int`, `float`, `decimal` and `rational` are distinct, and integers are exact',
			section: '2.5'
		},
		{
			topic: 'Dates and durations',
			theirs: 'Strings by convention',
			nova: '`@timestamp(…)` and `@duration(…)`, or a schema field that resolves the string',
			section: '4.8'
		},
		{
			topic: 'Duplicate keys',
			theirs: 'Left to the parser; often the last one wins',
			nova: 'Rejected by every parser and decoder',
			section: '2.10'
		},
		{
			topic: 'Other kinds',
			theirs: 'Objects and arrays',
			nova: 'Also sets, tuples, maps with any key, variants and bytes',
			section: '2'
		},
		{
			topic: 'Hashing',
			theirs: 'Needs a separate canonicalization scheme',
			nova: 'One canonical encoding, so every value has a SHA-256 revision',
			section: '2.13'
		}
	],
	migrate: {
		intro:
			'`nvf` reads JSON directly, so you can start with queries before converting anything. Converting is lossless: objects become records, and numbers without a fraction or exponent become exact integers.',
		steps: [
			{ lang: 'shellscript', code: migrateSh },
			{ filename: 'A duplicate key stops the conversion', lang: 'text', code: duplicate },
			{ filename: 'Going back', meta: 'every loss is reported', lang: 'text', code: toJson }
		],
		note: {
			text: 'Without `--strict` the same conversion succeeds and prints the losses as warnings. Decimals, timestamps and durations become strings.',
			section: '11.1',
			label: 'JSON mapping, spec §11.1'
		}
	},
	stayTitle: 'When to stay with JSON',
	stay: [
		'A browser or an API client reads the data. Every platform has a JSON parser; NOVA has a Rust implementation today, with other languages planned. Convert at that boundary with `nvf convert --to json`.',
		'You need a format that is stable today. NOVA is a 0.1 draft, and minor versions must match exactly while the major version is 0.'
	],
	faq: [
		{
			question: 'Can `nvf` read my JSON files without converting them?',
			answer:
				"Yes. `nvf get` and `nvf convert` detect JSON and JSON Lines input, so `curl … | nvf get - 'items[?price<10].name' -r` works like `jq -r`."
		},
		{
			question: 'What happens to timestamps and decimals when I write JSON?',
			answer:
				'They are written as their canonical text in a string, and the converter reports each one. Sets and tuples become arrays, maps become arrays of `[key, value]` pairs, and a variant with a payload becomes `{"tag": payload}`.'
		},
		{
			question: 'Why is `price: 19.99` not a decimal?',
			answer:
				'A bare number with a fraction is a float, as in JSON. Write `@decimal("19.99")`, or type the field `decimal` in a schema and leave the number plain.'
		}
	],
	related: [
		{ label: 'NOVA vs JSON Lines', href: '/vs/jsonl/' },
		{ label: 'NOVA vs binary formats', href: '/vs/binary/' }
	]
};
