import type { Meta, StoryObj } from '@storybook/sveltekit';
import { tools } from '#lib/content/home.ts';
import ToolsGrid from './ToolsGrid.svelte';

const meta = {
	title: 'Organisms/ToolsGrid',
	component: ToolsGrid,
	tags: ['autodocs'],
	args: { tools }
} satisfies Meta<typeof ToolsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Today: Story = {};
