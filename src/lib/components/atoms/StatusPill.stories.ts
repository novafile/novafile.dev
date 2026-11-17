import type { Meta, StoryObj } from '@storybook/sveltekit';
import StatusPill from './StatusPill.svelte';

const meta = {
	title: 'Atoms/StatusPill',
	component: StatusPill,
	tags: ['autodocs'],
	argTypes: { status: { control: 'inline-radio', options: ['available', 'planned'] } }
} satisfies Meta<typeof StatusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = { args: { status: 'available', label: 'Rust' } };
export const Planned: Story = { args: { status: 'planned', label: 'Go' } };
