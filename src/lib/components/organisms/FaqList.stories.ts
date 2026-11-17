import type { Meta, StoryObj } from '@storybook/sveltekit';
import { faq } from '#lib/content/vs-yaml.ts';
import FaqList from './FaqList.svelte';

const meta = {
	title: 'Organisms/FaqList',
	component: FaqList,
	tags: ['autodocs'],
	args: { items: faq }
} satisfies Meta<typeof FaqList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstOpen: Story = {};
export const AllClosed: Story = { args: { openFirst: false } };
