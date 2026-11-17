import type { Meta, StoryObj } from '@storybook/sveltekit';
import { formats } from '#lib/content/home.ts';
import FormatGrid from './FormatGrid.svelte';

const meta = {
	title: 'Organisms/FormatGrid',
	component: FormatGrid,
	tags: ['autodocs'],
	args: { formats }
} satisfies Meta<typeof FormatGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFormats: Story = {};
