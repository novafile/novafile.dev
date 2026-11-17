<script lang="ts">
	import Button from '#lib/components/atoms/Button.svelte';
	import Eyebrow from '#lib/components/atoms/Eyebrow.svelte';
	import Section from '#lib/components/atoms/Section.svelte';
	import CodeBlock from '#lib/components/molecules/CodeBlock.svelte';
	import CopyCommand from '#lib/components/molecules/CopyCommand.svelte';
	import SectionHeader from '#lib/components/molecules/SectionHeader.svelte';
	import AgentLoop from '#lib/components/organisms/AgentLoop.svelte';
	import EcosystemStrip from '#lib/components/organisms/EcosystemStrip.svelte';
	import FormatGrid from '#lib/components/organisms/FormatGrid.svelte';
	import RepresentationSwitcher from '#lib/components/organisms/RepresentationSwitcher.svelte';
	import ToolsGrid from '#lib/components/organisms/ToolsGrid.svelte';
	import { ecosystem, formats, tools } from '#lib/content/home.ts';
	import { site, specUrl } from '#lib/content/site.ts';
	import Seo from '#lib/seo/Seo.svelte';

	let { data } = $props();
</script>

<Seo
	title="NOVA: a typed data format for people, LLMs and agents"
	description="NOVA (novafile) is a typed data serialization format with human text for people, compact tables for LLMs, canonical binary for services, and conditional patches for agents. A JSON, YAML and TOML alternative with schemas."
	path="/"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'NOVA',
		url: site.url,
		description:
			'Notation for Objects, Values & Agents: one data model with several representations.'
	}}
/>

<div class="hero">
	<div class="intro">
		<Eyebrow>Notation for Objects, Values &amp; Agents · draft 0.1</Eyebrow>
		<h1>One data model. Every representation.</h1>
		<p class="lead">
			NOVA is a typed data format with human text for people, compact tables for LLMs, canonical
			binary for services, and conditional patches for agents. All of them decode to the same value.
		</p>
		<div class="actions">
			<Button href={specUrl()}>Read the spec</Button>
			<Button href="#coming-from" variant="secondary">Compare formats</Button>
		</div>
		<CopyCommand command={site.installCommand} />
	</div>
	<div class="sample">
		<RepresentationSwitcher items={data.representations} />
	</div>
</div>

<Section tone="surface" labelledby="coming-from">
	<SectionHeader
		id="coming-from"
		title="Coming from another format?"
		lead="Each page shows your format next to NOVA, what changes, how to convert, and when to stay where you are."
	/>
	<FormatGrid {formats} />
</Section>

<Section labelledby="agents">
	<SectionHeader
		id="agents"
		eyebrow="For LLMs and agents"
		title="Read a projection. Write a conditional patch."
		lead="Agents see only the fields they ask for and change only what they scope. The base revision and the expected old value catch concurrent edits."
	/>
	<AgentLoop steps={data.agentSteps} />
	<p class="note">
		Compact tables cut repeated keys from LLM context. <code>nvf stats</code> shows bytes and
		estimated tokens per representation for your own data.
		<a href={specUrl('8')} rel="external">The agent model, spec §8</a>
	</p>
</Section>

<Section tone="surface" labelledby="templates">
	<SectionHeader
		id="templates"
		title="Templates that work on values, not text"
		lead="Helm generates indentation-sensitive YAML with string functions. A NOVA template renders to a plain value before anything else sees it, so indentation and quoting cannot go wrong."
	/>
	<div class="pair">
		<CodeBlock {...data.helm} filename="Helm: templating text" tone="problem" />
		<CodeBlock {...data.template} filename="NOVA: templating values" tone="fix" />
	</div>
	<p class="note">
		Overlays need no new mechanism: an overlay is a patch applied to a rendered base.
		<a href={specUrl('9')} rel="external">Templates and overlays, spec §9</a>
	</p>
</Section>

<Section labelledby="tools">
	<SectionHeader id="tools" title="Tools that exist today" />
	<ToolsGrid {tools} />
</Section>

<Section tone="surface" padding="compact">
	<EcosystemStrip
		id="ecosystem"
		title="Ecosystem"
		lead="The Rust reference implementation ships today. Other languages will follow the same conformance suite."
		entries={ecosystem}
	/>
</Section>

<style>
	.hero {
		max-width: var(--nv-size-content);
		margin: 0 auto;
		padding: var(--nv-space-20) var(--nv-space-6) var(--nv-space-16);
		display: flex;
		flex-wrap: wrap;
		gap: var(--nv-space-12);
		align-items: flex-start;
	}

	.intro {
		flex: 1 1 24rem;
		max-width: 33rem;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--nv-space-6);
	}

	h1 {
		font-size: var(--nv-font-size-display);
		line-height: 1.05;
		letter-spacing: var(--nv-letter-spacing-display);
	}

	.lead {
		font-size: var(--nv-font-size-lead);
		line-height: 1.55;
		color: var(--nv-color-muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--nv-space-3);
	}

	.sample {
		flex: 1 1 32rem;
		min-width: 0;
	}

	.pair {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: var(--nv-space-4);
	}

	.note {
		margin-top: var(--nv-space-5);
		font-size: var(--nv-font-size-small);
		color: var(--nv-color-muted);
		max-width: var(--nv-size-prose);
	}

	.note code {
		font-size: 0.92em;
	}

	@media (max-width: 40rem) {
		.hero {
			padding: var(--nv-space-12) var(--nv-space-4);
		}

		h1 {
			font-size: 2.5rem;
		}
	}
</style>
