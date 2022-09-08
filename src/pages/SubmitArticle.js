const guidelinesList = [
    "The topics for submission should be related to peace and conflict resolution, peacebuilding activities at the economic, political, civil society and the social-cultural levels, with specific reference to India.", "The articles are published quarterly online, however open to print as well.", "OIJPCR welcomes concise, pointed, articles with few recommendations.", "All articles to be between 1000 -1500 words Helvetica Neue (bold), 16 size font with 1.5 Line spacing.", "A bibliography is not compulsory if it is a commentary or opinionated piece. But in case of a research article then Chicago style manual style is to be followed.", "All references if used should be mentioned within the article itself.", "Articles for submission should be exclusively for OIJPCR.", "The contributor will be responsible for factual accuracy and research integrity.", "Article email and short brief not exceeding 30 words, should be included along with the article.", "All articles to be emailed to Editor at editor@oijpcr.org", "All contributions will be reviewed and edited and the decision of the Editorial team would be final.", "We also welcome Book reviews of 1000-1500 words with a photo of the book as well, but the books to be reviewed should be related to Peace & Conflict resolution Studies only.", "Disclaimer: Opinions in the articles may not necessarily coincide with those of the Editorial Team."
];

const SubmitArticle = () => (<div className="flex-grow">
    <div className="flex items-center justify-center my-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Guidelines
            for submissions</h1>
    </div>
    <div className="mx-4 my-2">
        <ol className="list-decimal py-2 px-4 md:px-8">
            {guidelinesList.map((guideline, index) => {
                return (<li key={index}>{guideline}</li>);
            })}
        </ol>
    </div>
    <div className="grid place-items-center">
        <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdXrEyabD4y9YcYriSA9V80UT1zYdQ2pyHJbPW8P9B7ekwCrA/viewform?embedded=true"
            title="Submit Article"
            className="w-full"
            height={1024}
        >
            Loading…
        </iframe>
    </div>
</div>);


export default SubmitArticle;