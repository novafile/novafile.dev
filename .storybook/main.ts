import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|svelte)'],
	addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
	framework: { name: '@storybook/sveltekit', options: {} },
	core: { disableTelemetry: true }
};

export default config;
