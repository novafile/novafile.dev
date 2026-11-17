import type { Meta, StoryObj } from '@storybook/sveltekit';
import { text } from '../../../stories/snippet';
import { meta as yaml, related } from '#lib/content/vs-yaml.ts';
import ComparePage from './ComparePage.svelte';

const meta = {
	title: 'Templates/ComparePage',
	component: ComparePage,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: {
		format: 'YAML',
		title: yaml.title,
		lead: yaml.lead,
		outline: [
			{ id: 'what-changes', label: 'What changes' },
			{ id: 'migrate', label: 'Migrating' }
		],
		related,
		children: text('Side by side, what changes, migrating, when to stay, questions.')
	}
} satisfies Meta<typeof ComparePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Layout: Story = {};
