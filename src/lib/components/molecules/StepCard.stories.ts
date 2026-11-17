import type { Meta, StoryObj } from '@storybook/sveltekit';
import { highlight } from '#lib/highlight/index.ts';
import StepCard from './StepCard.svelte';

const meta = {
	title: 'Molecules/StepCard',
	component: StepCard,
	tags: ['autodocs']
} satisfies Meta<typeof StepCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Patch: Story = {
	args: {
		step: 3,
		title: 'The agent writes one line',
		code: '@patch sha256:91cf16db\n@scope services[id=api]\nreplicas: 5 -> 8'
	},
	loaders: [async ({ args }) => ({ html: await highlight(args.code ?? '', 'nova-patch') })],
	render: (args, { loaded }) => ({ Component: StepCard, props: { ...args, html: loaded.html } })
};
