import type { Meta, StoryObj } from '@storybook/sveltekit';
import { text } from '../../../stories/snippet';
import Eyebrow from './Eyebrow.svelte';

const meta = {
	title: 'Atoms/Eyebrow',
	component: Eyebrow,
	tags: ['autodocs'],
	argTypes: { tone: { control: 'inline-radio', options: ['muted', 'accent'] } }
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Muted: Story = {
	args: { children: text('Notation for Objects, Values & Agents · draft 0.1') }
};
export const Accent: Story = { args: { tone: 'accent', children: text('For LLMs and agents') } };
