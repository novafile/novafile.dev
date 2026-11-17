import type { Meta, StoryObj } from '@storybook/sveltekit';
import TokenTable from './TokenTable.svelte';

/**
 * Every value in the site comes from `tokens/tokens.json`. `yarn tokens` turns it into
 * CSS custom properties (`--nv-*`), with dark values under `[data-theme='dark']` and
 * `prefers-color-scheme`. Switch the theme in the toolbar to see both.
 */
const meta = {
	title: 'Foundations/Design tokens',
	component: TokenTable,
	tags: ['autodocs'],
	argTypes: {
		group: {
			control: 'select',
			options: [
				'color',
				'syntax',
				'font',
				'font-size',
				'font-weight',
				'line-height',
				'space',
				'radius',
				'size'
			]
		}
	}
} satisfies Meta<typeof TokenTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Color: Story = { args: { group: 'color' } };
export const Syntax: Story = { args: { group: 'syntax' } };
export const Typography: Story = { args: { group: 'font-size' } };
export const FontFamilies: Story = { args: { group: 'font' } };
export const Spacing: Story = { args: { group: 'space' } };
export const Radius: Story = { args: { group: 'radius' } };
export const Sizes: Story = { args: { group: 'size' } };
