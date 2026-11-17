import type { Meta, StoryObj } from '@storybook/sveltekit';
import { text } from '../../../stories/snippet';
import Tag from './Tag.svelte';

const meta = {
	title: 'Atoms/Tag',
	component: Tag,
	tags: ['autodocs'],
	argTypes: { tone: { control: 'inline-radio', options: ['accent', 'proposed', 'neutral'] } }
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpecSection: Story = { args: { tone: 'accent', children: text('§7.4') } };
export const Proposed: Story = { args: { tone: 'proposed', children: text('Proposed') } };
export const Neutral: Story = { args: { tone: 'neutral', children: text('draft 0.1') } };
