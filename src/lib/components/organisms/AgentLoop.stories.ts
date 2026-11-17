import type { Meta, StoryObj } from '@storybook/sveltekit';
import { highlightAll } from '#lib/highlight/index.ts';
import { agentSteps } from '#lib/content/home.ts';
import AgentLoop from './AgentLoop.svelte';

const meta = {
	title: 'Organisms/AgentLoop',
	component: AgentLoop,
	tags: ['autodocs'],
	args: { steps: agentSteps },
	loaders: [async () => ({ steps: await highlightAll(agentSteps) })],
	render: (args, { loaded }) => ({ Component: AgentLoop, props: { ...args, steps: loaded.steps } })
} satisfies Meta<typeof AgentLoop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GetPatchOk: Story = {};
