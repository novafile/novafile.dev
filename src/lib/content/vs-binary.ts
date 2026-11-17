import cborHex from './samples/vs-binary/cbor.txt?raw';
import novaHex from './samples/vs-binary/nova.txt?raw';
import migrateSh from './samples/vs-binary/migrate.sh?raw';
import type { Comparison } from './comparison';

export const comparison: Comparison = {
	path: '/vs/binary/',
	format: 'Binary formats',
	meta: {
		title: 'NOVA vs Cap’n Proto, CBOR and MessagePack',
		description:
			'NOVA binary is self-describing like CBOR and MessagePack, but every value has exactly one canonical encoding. Equality is byte equality, and every value has a SHA-256 revision.',
		lead: 'CBOR and MessagePack are self-describing, but one value can be encoded in several ways, so equal data can hash differently. Cap’n Proto is fast but needs its schema. NOVA binary is self-describing and has exactly one canonical encoding per value.'
	},
	stacked: true,
	before: {
		filename: 'CBOR',
		meta: '{a: 1, b: 2} written twice',
		lang: 'text',
		code: cborHex,
		notes: ['a first', 'b first: other bytes']
	},
	after: {
		filename: 'NOVA, canonical',
		meta: 'the same two records',
		lang: 'text',
		code: novaHex,
		notes: ['sha256:a200d6e9…', 'the same bytes']
	},
	afterNote: {
		text: 'Record fields are sorted by key in the canonical encoding, so field order never changes the bytes or the revision. CBOR has an optional deterministic mode that does the same for CBOR.',
		section: '5.2',
		label: 'Canonical encoding, spec §5.2'
	},
	changes: [
		{
			topic: 'Canonical form',
			theirs: 'MessagePack: none. CBOR: an optional deterministic profile',
			nova: 'Exactly one, the basis of equality',
			section: '5.2'
		},
		{
			topic: 'Hashing',
			theirs: 'Agree on an encoding first',
			nova: 'A `sha256:` revision of every value, used by patches',
			section: '2.13'
		},
		{
			topic: 'Types',
			theirs: 'Extension types and tags, agreed out of band',
			nova: 'Decimals, rationals, timestamps, durations, sets, tuples and variants built in',
			section: '5.1'
		},
		{
			topic: 'Duplicate keys',
			theirs: 'Often accepted by decoders',
			nova: 'Rejected by every decoder',
			section: '5.1'
		},
		{
			topic: 'Repeated keys',
			theirs: 'Written each time',
			nova: 'Back-references and record lists write a key once',
			section: '5.3'
		},
		{
			topic: 'Framing',
			theirs: 'None built in',
			nova: 'Frames with a magic number, optional schema reference and CRC-32',
			section: '5.4'
		}
	],
	migrate: {
		intro:
			'The reference tools read and write CBOR, including its deterministic encoding. MessagePack and Cap’n Proto have no adapter.',
		steps: [{ lang: 'shellscript', code: migrateSh }],
		note: {
			text: 'Timestamps, big integers, decimals, rationals and sets map to registered CBOR tags. Durations, tuples and variants have none and are reported as lossy.',
			section: '11.2',
			label: 'CBOR mapping, spec §11.2'
		}
	},
	stayTitle: 'When to stay with them',
	stay: [
		'You need zero-copy reads or an RPC system. Cap’n Proto is built for that; NOVA decodes into values.',
		'You exchange MessagePack with existing services. NOVA has no MessagePack adapter yet; it is listed as future work.',
		'You need a format that is stable today. NOVA is a 0.1 draft.'
	],
	faq: [
		{
			question: 'Can NOVA read and write CBOR?',
			answer:
				'Yes, as specified in RFC 8949, with a deterministic mode. NOVA kinds without a registered CBOR tag are written with a loss warning.'
		},
		{
			question: 'Is NOVA binary smaller than CBOR?',
			answer:
				'It depends on the data. Run `nvf stats FILE` to see the bytes and an estimate of tokens for every representation of your own file.'
		},
		{
			question: 'Does a reformatted file get a new revision?',
			answer:
				'No. A revision covers the value only. Comments, formatting and field order do not change it, so reformatting never invalidates a pending patch.'
		}
	],
	related: [
		{ label: 'NOVA vs Protobuf', href: '/vs/protobuf/' },
		{ label: 'NOVA vs JSON', href: '/vs/json/' }
	]
};
