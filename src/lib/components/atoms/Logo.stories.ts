import type { Meta, StoryObj } from '@storybook/sveltekit';
import Logo from './Logo.svelte';

const meta = {
	title: 'Atoms/Logo',
	component: Logo,
	tags: ['autodocs'],
	argTypes: { size: { control: { type: 'range', min: 12, max: 96, step: 2 } } }
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Wordmark: Story = { args: { size: 22 } };
export const Large: Story = { args: { size: 48 } };
export const MarkOnly: Story = { args: { size: 32, wordmark: false } };
export const Domain: Story = { args: { size: 18, text: 'novafile.dev' } };
