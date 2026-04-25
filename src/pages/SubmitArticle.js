const guidelinesList = [
    "The topics for submission should be related to peace and conflict resolution, peacebuilding activities at the economic, political, civil society and the social-cultural levels, with specific reference to India.", "The articles are published quarterly online, however open to print as well.", "OIJPCR welcomes concise, pointed, articles with few recommendations.", "All articles to be between 1000 - 1500 words with font style as Times New Roman and font size as 14 with 1.5 Line spacing.", "A bibliography is not compulsory if it is a commentary or opinionated piece. But in case of a research article then Chicago style manual style is to be followed.", "All references if used should be mentioned within the article itself.", "Articles for submission should be exclusively for OIJPCR.", "The contributor will be responsible for factual accuracy and research integrity.", "Article email and short brief not exceeding 30 words, should be included along with the article.", "All articles to be emailed to Editor at editor@oijpcr.org", "All contributions will be reviewed and edited and the decision of the Editorial team would be final.", "We also welcome Book reviews of 1000-1500 words with a photo of the book as well, but the books to be reviewed should be related to Peace & Conflict resolution Studies only.", "Disclaimer: Opinions in the articles may not necessarily coincide with those of the Editorial Team."
];

const SubmitArticle = () => (
    <div className="flex-grow max-w-7xl">
        <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 mt-10 mb-6">
            <h1
                className="text-3xl md:text-4xl font-serif font-bold pb-3"
                style={{
                    color: 'var(--color-primary)',
                    borderBottom: '1px solid var(--color-border)',
                }}
            >
                Guidelines for Submissions
            </h1>
        </div>

        <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 my-4 max-w-5xl">
            <ol className="list-decimal py-2 px-4 md:px-6 space-y-3"
                style={{ color: 'var(--color-text)' }}
            >
                {guidelinesList.map((guideline, index) => {
                    return (
                        <li
                            key={index}
                            className="py-1 leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {guideline}
                        </li>
                    );
                })}
            </ol>
        </div>

        <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 my-8">
            <h2
                className="text-xl font-serif font-bold uppercase tracking-wider pb-2 mb-4"
                style={{ color: 'var(--color-primary)', letterSpacing: '0.05em', fontSize: '15px' }}
            >
                Submission Form
            </h2>
            <div className="card-surface overflow-hidden">
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdXrEyabD4y9YcYriSA9V80UT1zYdQ2pyHJbPW8P9B7ekwCrA/viewform?embedded=true"
                    title="Submit Article"
                    className="w-full"
                    height={1024}
                    style={{ border: 'none' }}
                >
                    Loading…
                </iframe>
            </div>
        </div>
    </div>
);


export default SubmitArticle;
