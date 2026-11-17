import { ecosystem, representations, tools } from '#lib/content/home.ts';
import { site, specUrl } from '#lib/content/site.ts';
import { changes } from '#lib/content/vs-yaml.ts';
import { pages } from '#lib/seo/pages.ts';

export const prerender = true;
export const trailingSlash = 'never';

const fence = (lang: string, code: string) => '```' + lang + '\n' + code.trimEnd() + '\n```';

/** llms.txt (https://llmstxt.org): what NOVA is, built from the same content as the pages. */
export function GET() {
	const home = representations.find((r) => r.id === 'human')!;
	const body = `# NOVA

> NOVA, the Notation for Objects, Values & Agents (also "novafile"), is a typed data format with one data model and several representations: human text for people, compact tables for LLMs, canonical binary for services, and conditional patches and queries for agents. All of them decode to the same value. The specification is draft 0.1.

Documents use the \`.nova\` extension, schemas \`.novs\`, and patches \`.nova-patch\`. The reference implementation is written in Rust and ships the \`nvf\` command line and the \`nvf-lsp\` language server.

${fence('nova', home.code)}

## Representations

${representations.map((r) => `- [${r.label}](${specUrl(r.section)}): ${r.caption} (${r.sectionLabel})`).join('\n')}

## NOVA compared with YAML

${changes.map((c) => `- ${c.topic}: YAML: ${c.yaml}. NOVA: ${c.nova}. ([spec §${c.section}](${specUrl(c.section)}))`).join('\n')}

## Docs

- [Specification](${specUrl()}): the normative definition of the value model, text syntax, schemas, queries, patches and templates
- [Proposals](${site.specRepo}/tree/main/proposals): design proposals that are not normative yet
- [Conformance suite](${site.specRepo}/tree/main/conformance): cross-implementation test vectors
${pages.map((p) => `- [${p.title}](${new URL(p.path, site.url).href}): ${p.description}`).join('\n')}

## Tools

${tools.map((t) => `- ${t.href ? `[${t.name}](${t.href})` : t.name}: ${t.description}`).join('\n')}
- [Reference implementation](${site.implementationRepo}): Rust crates, \`nvf\` and \`nvf-lsp\`

## Optional

- Implementations: ${ecosystem.map((e) => `${e.label} (${e.status})`).join(', ')}
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
