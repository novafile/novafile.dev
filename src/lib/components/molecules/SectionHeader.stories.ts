import type { Meta, StoryObj } from '@storybook/sveltekit';
import SectionHeader from './SectionHeader.svelte';

const meta = {
	title: 'Molecules/SectionHeader',
	component: SectionHeader,
	tags: ['autodocs']
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEyebrow: Story = {
	args: {
		id: 'agents',
		eyebrow: 'For LLMs and agents',
		title: 'Read a projection. Write a conditional patch.',
		lead: 'Agents see only the fields they ask for and change only what they scope.'
	}
};

export const TitleOnly: Story = { args: { id: 'tools', title: 'Tools that exist today' } };
