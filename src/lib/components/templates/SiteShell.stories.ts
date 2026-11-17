import type { Meta, StoryObj } from '@storybook/sveltekit';
import { text } from '../../../stories/snippet';
import SiteShell from './SiteShell.svelte';

const meta = {
	title: 'Templates/SiteShell',
	component: SiteShell,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: { current: '/', children: text('Page content goes here.') }
} satisfies Meta<typeof SiteShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
