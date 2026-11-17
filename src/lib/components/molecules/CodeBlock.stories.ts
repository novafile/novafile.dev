import type { Meta, StoryObj } from '@storybook/sveltekit';
import { highlight, type CodeLang } from '#lib/highlight/index.ts';
import { novaSide, yamlSide } from '#lib/content/vs-yaml.ts';
import CodeBlock from './CodeBlock.svelte';

const meta = {
	title: 'Molecules/CodeBlock',
	component: CodeBlock,
	tags: ['autodocs'],
	argTypes: {
		tone: { control: 'inline-radio', options: ['neutral', 'problem', 'fix', 'accent'] },
		noteTone: { control: 'inline-radio', options: ['problem', 'fix'] }
	}
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Highlights `args.code` before rendering, the way pages do at build time. */
const highlighted = (lang: CodeLang): Partial<Story> => ({
	loaders: [async ({ args }) => ({ html: await highlight(args.code ?? '', lang) })],
	render: (args, { loaded }) => ({ Component: CodeBlock, props: { ...args, html: loaded.html } })
});

export const Plain: Story = {
	args: { code: 'nvf convert config.yaml --to nova' }
};

export const Highlighted: Story = {
	...highlighted('nova'),
	args: {
		filename: 'infrastructure.nova',
		code: `environment: production
ratio: 22/7          # an exact rational
services[2]{id,port,replicas}:
  auth,8080,3
  api,3000,5`
	}
};

export const Annotated: Story = {
	...highlighted('nova'),
	args: { ...novaSide, tone: 'accent', noteTone: 'fix' }
};

export const AnnotatedProblem: Story = {
	...highlighted('yaml'),
	args: { ...yamlSide, noteTone: 'problem' }
};
