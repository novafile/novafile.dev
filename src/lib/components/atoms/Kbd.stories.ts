import type { Meta, StoryObj } from '@storybook/sveltekit';
import { text } from '../../../stories/snippet';
import Kbd from './Kbd.svelte';

const meta = {
	title: 'Atoms/Kbd',
	component: Kbd,
	tags: ['autodocs'],
	args: { children: text('/') }
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Slash: Story = {};
