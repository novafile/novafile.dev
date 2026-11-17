/** FAQPage structured data for a list of questions. Backticks are dropped from the answers. */
export function faqPage(faq: { question: string; answer: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((f) => ({
			'@type': 'Question',
			name: f.question.replace(/`/g, ''),
			acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/`/g, '') }
		}))
	};
}
