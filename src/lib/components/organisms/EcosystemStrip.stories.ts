import type { Meta, StoryObj } from '@storybook/sveltekit';
import { ecosystem } from '#lib/content/home.ts';
import EcosystemStrip from './EcosystemStrip.svelte';

const meta = {
	title: 'Organisms/EcosystemStrip',
	component: EcosystemStrip,
	tags: ['autodocs'],
	args: {
		id: 'ecosystem',
		title: 'Ecosystem',
		lead: 'The Rust reference implementation ships today. Other languages will follow the same conformance suite.',
		entries: ecosystem
	}
} satisfies Meta<typeof EcosystemStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Today: Story = {};
export const SeveralAvailable: Story = {
	args: {
		entries: ecosystem.map((e, i) => ({ ...e, status: i < 3 ? 'available' : 'planned' }))
	}
};
