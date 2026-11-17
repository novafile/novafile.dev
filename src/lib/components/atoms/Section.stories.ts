import type { Meta, StoryObj } from '@storybook/sveltekit';
import { text } from '../../../stories/snippet';
import Section from './Section.svelte';

const meta = {
	title: 'Atoms/Section',
	component: Section,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	argTypes: {
		tone: { control: 'inline-radio', options: ['ground', 'surface'] },
		padding: { control: 'inline-radio', options: ['normal', 'compact'] }
	},
	args: { children: text('Section content sits in a centered column of at most 75rem.') }
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ground: Story = { args: { tone: 'ground' } };
export const Surface: Story = { args: { tone: 'surface' } };
export const Compact: Story = { args: { tone: 'surface', padding: 'compact' } };
