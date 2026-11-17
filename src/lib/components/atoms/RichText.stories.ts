import type { Meta, StoryObj } from '@storybook/sveltekit';
import RichText from './RichText.svelte';

const meta = {
	title: 'Atoms/RichText',
	component: RichText,
	tags: ['autodocs']
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InlineCode: Story = {
	args: { text: 'A bare word is a string unless it is `true`, `false`, `null` or a strict number.' }
};
