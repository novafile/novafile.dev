import type { Meta, StoryObj } from '@storybook/sveltekit';
import ToolCard from './ToolCard.svelte';

const meta = {
	title: 'Molecules/ToolCard',
	component: ToolCard,
	tags: ['autodocs']
} satisfies Meta<typeof ToolCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDetail: Story = {
	args: {
		name: 'nvf',
		description:
			'The command line: format, convert, validate, query, patch, diff, render and lint.',
		detail: 'fmt · convert · get · patch · diff · render · lint · stats'
	}
};

export const Linked: Story = {
	args: {
		name: 'VS Code',
		description:
			'Highlighting for documents, schemas and patches, plus the language server client.',
		href: 'https://github.com/novafile/vscode-novafile'
	}
};
