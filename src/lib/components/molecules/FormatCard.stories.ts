import type { Meta, StoryObj } from '@storybook/sveltekit';
import FormatCard from './FormatCard.svelte';

const meta = {
	title: 'Molecules/FormatCard',
	component: FormatCard,
	tags: ['autodocs'],
	parameters: { layout: 'centered' }
} satisfies Meta<typeof FormatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linked: Story = {
	args: {
		name: 'YAML',
		summary: '`no` stays a string. Indentation is exactly two spaces, never a guess.',
		href: '/vs/yaml/',
		featured: true
	}
};

export const NotWrittenYet: Story = {
	args: { name: 'TOML', summary: 'Explicit types like TOML, nesting like YAML.' }
};
