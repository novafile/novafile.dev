import type { ThemeRegistration } from 'shiki/core';

const v = (name: string) => `var(--nv-syntax-${name})`;

/**
 * A Shiki theme whose colors are the syntax design tokens, so one highlighted block
 * follows the light and dark themes without being highlighted twice.
 */
export const novaTokensTheme: ThemeRegistration = {
	name: 'nova-tokens',
	type: 'light',
	fg: v('fg'),
	bg: 'var(--nv-color-code)',
	colors: {
		'editor.foreground': v('fg'),
		'editor.background': 'var(--nv-color-code)'
	},
	tokenColors: [
		{ settings: { foreground: v('fg') } },
		{ scope: ['punctuation', 'meta.separator'], settings: { foreground: v('punctuation') } },
		{
			scope: [
				'entity.name.tag',
				'support.type.property-name',
				'variable.other.property',
				'meta.mapping.key'
			],
			settings: { foreground: v('key') }
		},
		{ scope: ['string', 'string.unquoted'], settings: { foreground: v('string') } },
		{
			scope: [
				'constant.numeric',
				'constant.language',
				'constant.other.revision',
				'constant.other.fingerprint'
			],
			settings: { foreground: v('number') }
		},
		{
			scope: [
				'keyword.control',
				'keyword.other',
				'storage.type',
				'storage.modifier',
				'punctuation.definition.directive',
				'support.function.typed-literal',
				'entity.other.attribute-name',
				'meta.attribute'
			],
			settings: { foreground: v('directive') }
		},
		{
			scope: [
				'constant.other.enum.variant',
				'punctuation.definition.variant',
				'entity.name.type',
				'support.type',
				'variable.other.reference',
				'punctuation.definition.variable',
				'variable.parameter',
				'variable.other.loop',
				'keyword.operator.spread',
				'support.constant'
			],
			settings: { foreground: v('variant') }
		},
		{
			scope: ['keyword.operator.arrow', 'keyword.operator.patch'],
			settings: { foreground: v('operator'), fontStyle: 'bold' }
		},
		{
			scope: ['comment', 'punctuation.definition.comment'],
			settings: { foreground: v('comment'), fontStyle: 'italic' }
		}
	]
};
