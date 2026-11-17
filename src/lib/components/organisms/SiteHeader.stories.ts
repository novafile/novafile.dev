import type { Meta, StoryObj } from '@storybook/sveltekit';
import { mainNav, site } from '#lib/content/site.ts';
import SiteHeader from './SiteHeader.svelte';

const meta = {
	title: 'Organisms/SiteHeader',
	component: SiteHeader,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: { nav: mainNav, github: site.github }
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = { args: { current: '/' } };
export const OnComparePage: Story = { args: { current: '/vs/yaml/' } };
export const Phone: Story = { globals: { viewport: { value: 'mobile1' } } };
