import type { Meta, StoryObj } from '@storybook/sveltekit';
import { text } from '../../../stories/snippet';
import Button from './Button.svelte';

const meta = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: { variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] } },
	args: { children: text('Read the spec') }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary', href: '#' } };
export const Secondary: Story = {
	args: { variant: 'secondary', href: '#', children: text('Compare formats') }
};
export const Ghost: Story = { args: { variant: 'ghost', children: text('Cancel') } };
