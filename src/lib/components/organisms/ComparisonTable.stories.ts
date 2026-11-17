import type { Meta, StoryObj } from '@storybook/sveltekit';
import { changes } from '#lib/content/vs-yaml.ts';
import { specUrl } from '#lib/content/site.ts';
import ComparisonTable from './ComparisonTable.svelte';

const meta = {
	title: 'Organisms/ComparisonTable',
	component: ComparisonTable,
	tags: ['autodocs'],
	args: {
		format: 'YAML',
		rows: changes.map((c) => ({
			topic: c.topic,
			theirs: c.yaml,
			nova: c.nova,
			sectionLabel: `§${c.section}`,
			sectionHref: specUrl(c.section)
		}))
	}
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Yaml: Story = {};
