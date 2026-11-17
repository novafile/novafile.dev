import type { Preview } from '@storybook/sveltekit';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import '../src/lib/styles/global.css';

const preview: Preview = {
	globalTypes: {
		theme: {
			description: 'Color theme',
			toolbar: {
				title: 'Theme',
				icon: 'contrast',
				items: [
					{ value: 'light', title: 'Light' },
					{ value: 'dark', title: 'Dark' }
				],
				dynamicTitle: true
			}
		}
	},
	initialGlobals: { theme: 'light' },
	decorators: [
		(story, context) => {
			document.documentElement.dataset.theme = context.globals.theme ?? 'light';
			return story();
		}
	],
	parameters: {
		layout: 'padded',
		backgrounds: { disable: true },
		a11y: { test: 'error' },
		options: {
			storySort: {
				order: ['Introduction', 'Foundations', 'Atoms', 'Molecules', 'Organisms', 'Templates']
			}
		}
	}
};

export default preview;
