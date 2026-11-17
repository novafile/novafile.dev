import { createHighlighterCore, type HighlighterCore, type LanguageRegistration } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import nova from './grammars/nova.tmLanguage.json';
import novaPatch from './grammars/nova-patch.tmLanguage.json';
import novaSchema from './grammars/nova-schema.tmLanguage.json';
import { novaTokensTheme } from './theme';

export type CodeLang =
	'nova' | 'nova-patch' | 'nova-schema' | 'yaml' | 'json' | 'toml' | 'shellscript' | 'text';

const grammar = (g: unknown, name: string): LanguageRegistration =>
	({ ...(g as object), name }) as LanguageRegistration;

let highlighter: Promise<HighlighterCore> | undefined;

function getHighlighter(): Promise<HighlighterCore> {
	highlighter ??= createHighlighterCore({
		themes: [novaTokensTheme],
		langs: [
			grammar(nova, 'nova'),
			grammar(novaPatch, 'nova-patch'),
			grammar(novaSchema, 'nova-schema'),
			import('shiki/langs/yaml.mjs'),
			import('shiki/langs/json.mjs'),
			import('shiki/langs/toml.mjs'),
			import('shiki/langs/shellscript.mjs')
		],
		engine: createOnigurumaEngine(import('shiki/wasm'))
	});
	return highlighter;
}

/** Highlights code into a `<pre class="shiki">` string colored with the syntax tokens. */
export async function highlight(code: string, lang: CodeLang): Promise<string> {
	const h = await getHighlighter();
	return h.codeToHtml(code.replace(/\n$/, ''), {
		lang: lang === 'text' ? 'plaintext' : lang,
		theme: 'nova-tokens'
	});
}

/** Highlights every `code`/`lang` pair in a list, adding an `html` field to each. */
export async function highlightAll<T extends { code: string; lang: CodeLang }>(
	items: T[]
): Promise<(T & { html: string })[]> {
	return Promise.all(
		items.map(async (item) => ({ ...item, html: await highlight(item.code, item.lang) }))
	);
}
