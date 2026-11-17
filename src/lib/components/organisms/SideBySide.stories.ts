import type { Meta, StoryObj } from '@storybook/sveltekit';
import { highlight } from '#lib/highlight/index.ts';
import { helmSample, templateSample } from '#lib/content/home.ts';
import { novaSide, yamlSide } from '#lib/content/vs-yaml.ts';
import SideBySide from './SideBySide.svelte';

const meta = {
	title: 'Organisms/SideBySide',
	component: SideBySide,
	tags: ['autodocs'],
	argTypes: { variant: { control: 'inline-radio', options: ['annotated', 'problem-fix'] } }
} satisfies Meta<typeof SideBySide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const YamlVsNova: Story = {
	args: { before: yamlSide, after: novaSide },
	loaders: [
		async () => ({
			before: { ...yamlSide, html: await highlight(yamlSide.code, yamlSide.lang) },
			after: { ...novaSide, html: await highlight(novaSide.code, novaSide.lang) }
		})
	],
	render: (args, { loaded }) => ({
		Component: SideBySide,
		props: { ...args, before: loaded.before, after: loaded.after }
	})
};

export const HelmVsTemplate: Story = {
	args: {
		variant: 'problem-fix',
		before: { ...helmSample, filename: 'Helm: templating text' },
		after: { ...templateSample, filename: 'NOVA: templating values' }
	},
	loaders: [
		async () => ({
			before: {
				...helmSample,
				filename: 'Helm: templating text',
				html: await highlight(helmSample.code, helmSample.lang)
			},
			after: {
				...templateSample,
				filename: 'NOVA: templating values',
				html: await highlight(templateSample.code, templateSample.lang)
			}
		})
	],
	render: (args, { loaded }) => ({
		Component: SideBySide,
		props: { ...args, before: loaded.before, after: loaded.after }
	})
};
