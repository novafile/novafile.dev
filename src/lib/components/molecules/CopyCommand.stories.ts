import type { Meta, StoryObj } from '@storybook/sveltekit';
import CopyCommand from './CopyCommand.svelte';

const meta = {
	title: 'Molecules/CopyCommand',
	component: CopyCommand,
	tags: ['autodocs']
} satisfies Meta<typeof CopyCommand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Install: Story = { args: { command: 'cargo install novafile-cli' } };
