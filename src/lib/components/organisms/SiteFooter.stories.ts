import type { Meta, StoryObj } from '@storybook/sveltekit';
import { footerColumns, site } from '#lib/content/site.ts';
import SiteFooter from './SiteFooter.svelte';

const meta = {
	title: 'Organisms/SiteFooter',
	component: SiteFooter,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: { columns: footerColumns, domain: site.domain }
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
