import type { CodeLang } from '#lib/highlight/index.ts';
import type { SpecSection } from './site';

/** One code sample on a comparison page. Strings in `notes` line up with the lines of `code`. */
export interface Sample {
	filename?: string;
	meta?: string;
	lang: CodeLang;
	code: string;
	notes?: string[];
}

/** A short remark under a sample, linked to the spec section that backs it. */
export interface SpecNote {
	text: string;
	section: SpecSection;
	label: string;
}

/**
 * The content of a "NOVA vs X" page. Every claim about NOVA links a section of
 * SPEC.md; strings may mark inline code with backticks.
 */
export interface Comparison {
	/** Path with trailing slash, e.g. `/vs/json/`. */
	path: string;
	/** Name of the other format, for the breadcrumb and the table header. */
	format: string;
	meta: { title: string; description: string; lead: string };
	before: Sample;
	after: Sample;
	/** `problem-fix` colors the headers as a problem and its fix. */
	variant?: 'annotated' | 'problem-fix';
	/** Put the samples above each other when their lines and notes are too wide for two columns. */
	stacked?: boolean;
	afterNote?: SpecNote;
	changes: { topic: string; theirs: string; nova: string; section: SpecSection }[];
	migrate: { intro: string; steps: Sample[]; note?: SpecNote };
	/** Heading of the "when to stay" section, e.g. "When to stay with JSON". */
	stayTitle: string;
	stay: string[];
	faq: { question: string; answer: string }[];
	related: { label: string; href: string }[];
}
