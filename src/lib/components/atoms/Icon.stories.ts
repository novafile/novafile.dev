import type { Meta, StoryObj } from '@storybook/sveltekit';
import Icon, { iconNames } from './Icon.svelte';

const meta = {
	title: 'Atoms/Icon',
	component: Icon,
	tags: ['autodocs'],
	argTypes: { name: { control: 'select', options: iconNames } }
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = { args: { name: 'search' } };
export const GitHub: Story = { args: { name: 'github', size: 24 } };
export const Labelled: Story = { args: { name: 'copy', label: 'Copy' } };
