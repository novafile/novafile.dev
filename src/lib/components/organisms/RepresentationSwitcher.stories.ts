import type { Meta, StoryObj } from '@storybook/sveltekit';
import { highlightAll } from '#lib/highlight/index.ts';
import { representations } from '#lib/content/home.ts';
import { specUrl } from '#lib/content/site.ts';
import RepresentationSwitcher from './RepresentationSwitcher.svelte';

const items = representations.map((r) => ({ ...r, sectionHref: specUrl(r.section) }));

const meta = {
	title: 'Organisms/RepresentationSwitcher',
	component: RepresentationSwitcher,
	tags: ['autodocs'],
	args: { items },
	argTypes: { initial: { control: 'select', options: items.map((i) => i.id) } },
	loaders: [async () => ({ items: await highlightAll(items) })],
	render: (args, { loaded }) => ({
		Component: RepresentationSwitcher,
		props: { ...args, items: loaded.items }
	})
} satisfies Meta<typeof RepresentationSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HumanText: Story = {};
export const Patch: Story = { args: { initial: 'patch' } };
export const Template: Story = { args: { initial: 'template' } };
